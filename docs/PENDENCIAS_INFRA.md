# Pendências de Infraestrutura — handoff para a equipe

Contexto: o branch `feature/site-jtech-initial-setup` acumulou correções de
segurança e de conteúdo que **já estão no repositório mas não em produção**.

> **Topologia atual (confirmada em 19/08/2026).** A produção é publicada pelo
> `.gitlab-ci.yml`, não mais pelo procedimento manual de EC2 descrito no
> `DEPLOY_AWS.md`:
>
> | Componente | Como é publicado |
> |---|---|
> | Backend (Strapi) | Imagem Docker `linux/arm64` → ECR `jtech-portal` → serviço **ECS** (`script/deploy-ecs-production.sh`) |
> | Variáveis do backend | Arquivo de ambiente no S3: `s3://jtech-environment/jtech-portal/.env` |
> | Frontend | `npm ci && npm run build` no runner → `s3://jtech-site-prod` → invalidação do CloudFront `EU8RBW6EG8XCB` |
> | Gatilho | Push/merge em `main` — **deploy automático de backend e frontend** |

---

## 1. Deploy da versão atual

**Basta mergear o MR em `main`.** O pipeline cuida do resto: constrói a imagem do
backend, publica no ECR, registra nova task definition, atualiza o serviço ECS e
aguarda estabilizar; em paralelo constrói o frontend e sincroniza com o S3 +
invalidação do CloudFront.

Não há SSH nem `pm2` envolvidos.

### O que observar durante o pipeline

- **`prepare-version`** falha se `package.json` do root e do `strapi-backend`
  tiverem versões diferentes. Hoje ambos estão em `1.0.0` — conferido.
- **`build-frontend`** exige a variável de arquivo `FRONTEND_ENV_PRODUCTION`
  configurada no GitLab. Esta entrega **não introduz nenhuma variável nova**
  de frontend, então nada precisa ser acrescentado lá.
- **`deploy-backend`** roda `aws ecs wait services-stable`; se o healthcheck do
  container falhar, o job falha. O healthcheck chama `/api/health` de dentro do
  container e só verifica o status HTTP — as mudanças desta entrega mantêm o
  `200`, então ele continua válido.

### Validação pós-deploy

```bash
# o link de download dos e-books não pode mais aparecer na API pública
curl -s "https://cms.jtech.com.br/api/ebooks?populate=*" | grep -c downloadUrl   # esperado: 0

# rota nova de download existe e valida a entrada (400, não 404)
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  https://cms.jtech.com.br/api/ebooks/qualquer/download \
  -H "Content-Type: application/json" -d '{}'                                    # esperado: 400

# fingerprint do backend removido
curl -sI https://cms.jtech.com.br/api/posts | grep -i x-powered-by               # esperado: vazio
```

Se a segunda chamada devolver 404, a imagem publicada não é a nova — conferir se
o job `deploy-backend` concluiu e se o serviço ECS subiu a nova task definition.

Depois, teste funcional: publicar um e-book com `downloadUrl`, enviar o
formulário no site e conferir o registro em **Content Manager → Ebook Lead**.

> A coleção `ebook-lead` é nova: a tabela é criada pelo Strapi no start do
> container. Acompanhar os logs em `/ecs/jtech-portal` (CloudWatch) no primeiro
> deploy.

---

## 2. `PUBLIC_URL` no arquivo de ambiente

**Por quê:** sem essa variável o Strapi monta links absolutos com o host interno
do container. O sintoma aparece no e-mail de recuperação de senha do admin, que
sai apontando para um endereço inacessível — e só se descobre no momento em que
alguém precisa recuperar a senha. O código já lê a variável.

**Como:** acrescentar ao arquivo `s3://jtech-environment/jtech-portal/.env`:

```env
PUBLIC_URL=https://cms.jtech.com.br
```

O arquivo é lido na inicialização do container (`environmentFiles` na task
definition), então é preciso forçar um novo deployment para valer:

```bash
aws ecs update-service --cluster <CLUSTER> --service <SERVICE> --force-new-deployment
```

> Enquanto estiver nesse arquivo, confirmar que `CDN_URL=https://conteudo.sansys.app`
> também está presente — é o que faz a API devolver as imagens pelo CloudFront de
> mídia em vez da URL padrão do S3.

---

## 3. Atualizar o Strapi (5.42.0 → 5.52.0) — já preparado e testado

**É o item mais crítico da lista.** Na 5.42 o backend acumulava vulnerabilidades
de dependências, incluindo um **bypass de rate limit no login** do
`@strapi/plugin-users-permissions` (afeta `<= 5.44.0`), que habilita força bruta
de senha no painel.

A atualização **já está pronta e validada** no branch `chore/strapi-5.52`
(ponta em `c9ba1f6`), com `package-lock.json` de instalação limpa.

Estado das dependências depois da atualização: **0 críticas, 1 alta, 14
moderadas, 4 baixas** — e o advisory de rate limit fora do audit. A única alta
restante é do `vite`, ferramenta de build do painel admin, que não executa no
servidor em produção. As demais são transitivas do Strapi, sem caminho de
correção do nosso lado até que eles publiquem novas versões.

O branch inclui também `node-cron` 3 → 4, que remove da árvore a última
vulnerabilidade sob nosso controle (o `uuid` vulnerável entrava só por ali).

### Como aplicar

MR de `chore/strapi-5.52` → `main`, **depois** que o MR desta entrega for
mergeado (o branch foi criado a partir dele). O pipeline reconstrói a imagem com
`npm ci` a partir do lock validado.

> **Antes de mergear, snapshot do RDS.** O salto de versão aplica migrações de
> schema no start do container, e não há caminho de volta automático.

> ⚠️ **Não tente atualizar com `npm install @strapi/...@5.52.0` sobre uma árvore
> existente.** Isso quebra o build do admin com
> `Cannot find module '@radix-ui/react-tooltip'`: o npm deixa o pacote aninhado
> sob `@strapi/design-system` e o 5.52 exige que ele seja resolvível a partir de
> `@strapi/admin`. Verificado na prática. O Dockerfile usa `npm ci`, que parte do
> lock e não cai nesse problema.

### O que só dá para validar em produção

- **Upload de mídia para o S3/CloudFront** — o provider só é ativado com
  `NODE_ENV=production`. Após o deploy, subir uma imagem pelo painel e conferir
  que a URL sai como `https://conteudo.sansys.app/uploads-strapi/...`
- **Login no admin com os usuários reais** (o banco de teste é local)
- **Fluxo de preview ponta a ponta**, que exige um editor autenticado

> Fazer **em deploy separado** do item 1. São mudanças de natureza diferente; se
> algo quebrar, é preciso saber qual das duas causou.

---

## 4. Content-Security-Policy no CloudFront do site

`jtech.com.br` não tem CSP. Tem `X-Frame-Options`, `nosniff` e HSTS, mas nada
que limite de onde scripts podem ser carregados. É a segunda barreira contra
XSS: a primeira (sanitização do conteúdo do CMS) já foi implementada em código.

CloudFront → distribuição `EU8RBW6EG8XCB` → **Response headers policy**:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://conteudo.sansys.app; font-src 'self';
  connect-src 'self' https://cms.jtech.com.br https://n8n.jtech.com.br;
  frame-src https://www.youtube.com https://player.vimeo.com;
  frame-ancestors 'none'; base-uri 'self'; object-src 'none'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

`style-src 'unsafe-inline'` é necessário por causa do Tailwind. Quando o GTM for
ativado, o domínio dele precisa entrar em `script-src`.

---

## 5. Restringir o painel `/admin`

Hoje `cms.jtech.com.br/admin` responde para a internet inteira, e o Strapi
Community **não tem 2FA nem SSO** — a única barreira é a senha do editor.
Combinado com o bypass de rate limit do item 3, o conjunto merece atenção.

Com o backend em ECS, a restrição fica no que estiver na frente do serviço
(ALB e/ou CloudFront). Duas opções:

- **WAF** na distribuição/ALB com regra de IP para o path `/admin*`
- **Regra de listener no ALB** devolvendo 403 para `/admin*` fora da faixa de IPs
  do escritório/VPN

A API (`/api`) precisa continuar pública.

---

## 6. Cache policy do CloudFront na frente do CMS

`cms.jtech.com.br` passa por CloudFront. Conferir no console se essa distribuição
**não** cacheia respostas com `Set-Cookie` ou `Authorization` — caso contrário,
uma sessão de preview pode ser servida a outro visitante. Para `/api/*` o caminho
seguro é `CachingDisabled` com origin request `AllViewer`.

---

## 7. (Opcional) Restringir `/api/health`

O endpoint é público e serve de sinal para monitoramento. Depois desta entrega
ele deixa de expor versão, uptime e ambiente em produção, o que reduz bastante o
risco de fingerprint. Se ainda assim quiserem fechá-lo, atenção: **o healthcheck
do container chama `/api/health` em `127.0.0.1`**, então restringir no ALB/WAF
não afeta o ECS — mas afeta qualquer monitoramento externo que dependa dele.

---

## 8. Publicar os workflows do n8n

Os webhooks de captação apontam para `/webhook-test/`, que no n8n só responde
com o editor aberto — e hoje devolvem **404**, assim como os de produção. Todo
formulário enviado terminava em erro para o visitante.

O envio está **congelado** no código (`LEADS_TRANSPORT = "disabled"`), com
mensagem honesta de indisponibilidade em vez de erro técnico. Para religar,
depois que os fluxos definitivos existirem:

1. publicar os workflows no n8n;
2. em `src/lib/endpoints.ts`, trocar `/webhook-test/` por `/webhook/` e conferir
   os IDs;
3. voltar `LEADS_TRANSPORT` para `"n8n_webhook"`;
4. merge em `main` (o pipeline publica) e teste com envio real.

> Enquanto isso, os leads de e-book **não dependem do n8n**: são gravados no
> próprio Strapi (coleção `Ebook Lead`).

---

## 9. Ativar a medição (quando houver decisão)

`GTM_CONTAINER_ID`, `GA4_MEASUREMENT_ID` e `HOTJAR_SITE_ID` estão com valores de
placeholder em `src/lib/endpoints.ts` — nenhuma medição roda hoje.

O Google Consent Mode v2 já está implementado: o site nega tudo por padrão e
propaga as escolhas do banner (`ad_storage`, `ad_user_data`, `ad_personalization`,
`analytics_storage`). As tags dentro do GTM precisam ser configuradas para
respeitar esses sinais, senão o consentimento não vale na prática.
