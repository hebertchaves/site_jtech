# Pendências de Infraestrutura — handoff para a equipe

Contexto: o branch `feature/site-jtech-initial-setup` acumulou correções de
segurança e de conteúdo que **já estão no repositório mas não em produção**. O
que está no ar é o build anterior. Nenhum item abaixo pode ser feito sem acesso
à EC2 ou ao console da AWS.

Ordem sugerida: **1 → 2 → 3**, e os demais conforme a agenda.

---

## 1. Deploy da versão atual

Segue o procedimento de "Atualização de Versão (deploy incremental)" em
`DEPLOY_AWS.md`. Backend primeiro, frontend depois — o site novo depende de uma
rota de API que só existe após o deploy do Strapi.

Aproveitar a janela para acrescentar ao `/home/ubuntu/jtech-cms/.env`:

```env
PUBLIC_URL=https://cms.jtech.com.br
```

**Por quê:** sem essa variável o Strapi monta links absolutos com o host interno
da instância. O sintoma aparece no e-mail de recuperação de senha do admin, que
pode sair apontando para `http://0.0.0.0:1337` — e só se descobre no momento em
que alguém precisa recuperar a senha. O código já lê a variável.

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

Se a segunda chamada devolver 404, a rota não subiu — verificar se o `git pull`
trouxe os arquivos e se o `npm run build` rodou.

Depois, teste funcional: publicar um e-book com `downloadUrl`, enviar o
formulário no site e conferir o registro em **Content Manager → Ebook Lead**.

---

## 2. Atualizar o Strapi (5.42.0 → 5.52.0)

**É o item mais crítico da lista.** O backend acumula 65 vulnerabilidades de
dependências, 2 críticas (`tar`, `shell-quote`). A mais grave é um **bypass de
rate limit no login** do `@strapi/plugin-users-permissions`, que afeta versões
`<= 5.44.0` — habilita força bruta de senha no painel.

```bash
cd strapi-backend
npm install @strapi/strapi@5.52.0 @strapi/plugin-users-permissions@5.52.0 \
            @strapi/provider-upload-aws-s3@5.52.0
npm run build
```

Testar antes de subir: login no admin, listagem de posts e e-books pela API,
upload de mídia (confirmar que continua indo para `conteudo.sansys.app`) e o
fluxo de preview ponta a ponta.

> Fazer **em deploy separado** do item 1. São mudanças de natureza diferente; se
> algo quebrar, é preciso saber qual das duas causou.

---

## 3. Restringir o painel `/admin`

Hoje `cms.jtech.com.br/admin` responde para a internet inteira, e o Strapi
Community **não tem 2FA nem SSO** — a única barreira é a senha do editor.
Combinado com o bypass de rate limit do item 2, o conjunto merece atenção.

No Nginx da EC2:

```nginx
location /admin {
    allow 200.x.x.x/32;   # IPs do escritório / VPN
    deny all;
    proxy_pass http://127.0.0.1:1337;
}
```

A API (`/api`) continua pública, como precisa ser.

---

## 4. Content-Security-Policy no CloudFront do site

`jtech.com.br` não tem CSP. Tem `X-Frame-Options`, `nosniff` e HSTS, mas nada
que limite de onde scripts podem ser carregados. É a segunda barreira contra
XSS: a primeira (sanitização do conteúdo do CMS) já foi implementada em código.

CloudFront → distribuição do site → **Response headers policy**:

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

## 5. Cache policy do CloudFront na frente do CMS

`cms.jtech.com.br` passa por uma distribuição CloudFront que não consta no guia
de deploy original. Conferir no console se ela **não** cacheia respostas com
`Set-Cookie` ou `Authorization` — caso contrário, uma sessão de preview pode ser
servida a outro visitante. Para `/api/*` o caminho seguro é `CachingDisabled`
com origin request `AllViewer`.

---

## 6. Publicar os workflows do n8n

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
4. novo build do frontend e teste com envio real.

> Enquanto isso, os leads de e-book **não dependem do n8n**: são gravados no
> próprio Strapi (coleção `Ebook Lead`).

---

## 7. Ativar a medição (quando houver decisão)

`GTM_CONTAINER_ID`, `GA4_MEASUREMENT_ID` e `HOTJAR_SITE_ID` estão com valores de
placeholder em `src/lib/endpoints.ts` — nenhuma medição roda hoje.

O Google Consent Mode v2 já está implementado: o site nega tudo por padrão e
propaga as escolhas do banner (`ad_storage`, `ad_user_data`, `ad_personalization`,
`analytics_storage`). As tags dentro do GTM precisam ser configuradas para
respeitar esses sinais, senão o consentimento não vale na prática.
