# Integrações do site — guia de parametrização

Cinco ferramentas se conectam ao site: **RD Station**, **Google Ads**, **Google
Analytics**, **Hotjar** e **n8n**. Nenhuma delas está ativa hoje — todas aguardam
um identificador ou endereço que só quem administra a plataforma consegue gerar.

Este documento diz o que enviar, onde o valor é aplicado e o que cada um exige
para entrar no ar. Escrito para quem fornece os IDs, não para quem programa.

---

## Onde ficam as configurações

Antes das ferramentas em si, vale entender os três lugares onde um valor pode
morar — é isso que determina quem consegue alterá-lo e quanto tempo leva até a
mudança aparecer no site.

| Lugar | Quem altera | Quando vale |
|---|---|---|
| **Painel do Strapi** | O próprio responsável | No próximo carregamento da página |
| **Variável no GitLab** | Desenvolvimento / infraestrutura | Após rodar a publicação |
| **Código do site** | Desenvolvimento | Após alteração, revisão e publicação |

---

## RD Station

> **Estado:** aguardando URL

O site usa a RD Station em três pontos: os botões de contato de cada produto, o
formulário que aparece antes de abrir o WhatsApp na página inicial, e os e-books
configurados para captar por formulário.

Em todos eles o comportamento é o mesmo: o visitante clica e o site **abre a
página do formulário da RD em uma nova aba**. Por isso o que precisamos é um
endereço — não um trecho de código.

> ⚠️ **O código de incorporação não serve.** Se a RD entregar algo como
> `<div id="..."></div><script src="...">`, isso é um *formulário incorporado*:
> foi feito para ser colado dentro de uma página, e o texto entre aspas é um
> identificador interno, não um endereço que se possa abrir no navegador.
>
> O que precisamos é de uma **Landing Page publicada** — outro tipo de material
> dentro da RD Station Marketing, que gera um endereço próprio começando com
> `https://`.

| | |
|---|---|
| **O que enviar** | O endereço de uma Landing Page publicada, um para cada produto que tiver formulário próprio |
| **Formato** | `https://materiais.exemplo.com.br/nome-da-pagina` |
| **Onde é aplicado** | Painel do Strapi → **Product CTA Config** (um registro por produto) e **Ebook** (campo do formulário) |
| **Quem aplica** | O próprio responsável, pelo painel |
| **Precisa republicar?** | Não |

### Se a preferência for manter o visitante no site

É possível exibir o formulário dentro da própria página, sem abrir aba nova.
Isso exige desenvolvimento e muda o que se envia: em vez do endereço, passaria a
ser o identificador do formulário. Também tem duas consequências que precisam de
decisão antes:

- o script da RD passa a ser carregado no site, o que exige liberá-lo na
  Content-Security-Policy (ver `PENDENCIAS_INFRA.md`, item 4);
- ele só pode subir depois que o visitante aceitar cookies de marketing.

Se essa for a escolha, avisar **antes** de a CSP ser aplicada.

### Identificação de cada formulário

A RD separa a origem das conversões pelo identificador do formulário. Existem
dois caminhos no site, e só um deles é nosso:

**Formulários que rodam na RD (Landing Pages).** É o caminho dos CTAs de produto
configurados com `rdFormUrl`. O formulário não está no nosso site — o visitante é
levado para a página da RD. Quem nomeia é quem administra a RD, no painel. Para
separar produto a produto, basta uma Landing Page por produto, cadastrada no
Strapi em **Product CTA Config**.

**Formulários nativos do site.** São quatro. Cada um carrega um identificador que
vai no `id` e no `name` do HTML, no `form_name` enviado com o lead e no evento do
dataLayer — os três sempre com o mesmo valor:

| Formulário | Onde aparece | Identificador |
|---|---|---|
| Contato | Página de contato | `contact_<motivo>` — `customer`, `sales` ou `other` |
| Newsletter | Página de conteúdo | `newsletter_content_page` |
| E-book | Página de cada e-book | `ebook_<slug-do-ebook>` |
| Pré-WhatsApp | Modal na home e em soluções | `pre_whatsapp_<slug-do-produto>` — `homepage` na página inicial |

Os dois últimos usam o slug para que a origem seja distinguível: sem ele, todos
os e-books e todos os produtos chegariam à RD com o mesmo nome de formulário.
No pré-WhatsApp o slug também viaja em `product_interest`.

> O identificador é o mesmo em todos os idiomas. O idioma da visita vai em campo
> separado (`language`), então não é preciso um formulário por idioma na RD.

---

## Google Ads

> **Estado:** aguardando IDs

Vale esclarecer o escopo: **o site não exibe publicidade** e não há nenhum espaço
reservado para anúncios de terceiros. O que se configura é o contrário disso — a
medição que permite saber *quais leads chegaram por anúncio pago* e quanto cada
campanha custou por lead.

### Como a origem do lead é identificada hoje

Quando alguém chega por um anúncio, a origem viaja na própria URL, nos parâmetros
`utm_`. O site lê esses parâmetros na chegada, guarda durante a visita e os envia
junto com cada formulário enviado — o lead chega identificado sem precisar
perguntar "como você nos conheceu?".

Para isso funcionar, o **URL final** de cada anúncio precisa ser montado com:

| Parâmetro | Valor sugerido | Para que serve |
|---|---|---|
| `utm_source` | `google` | De onde veio |
| `utm_medium` | `cpc` | Distingue pago de orgânico |
| `utm_campaign` | `sansys-water-2026` | Qual campanha |
| `utm_content` | `anuncio-a` | Qual variação do anúncio |
| `utm_term` | `gestao-de-agua` | Palavra-chave |

> ⚠️ **Uma limitação que vale decidir agora.** O site captura os cinco parâmetros
> acima, mas **não** captura o `gclid` — o identificador que o Google adiciona a
> cada clique em anúncio.
>
> Sem ele é possível saber que o lead veio de uma campanha, mas não devolver ao
> Google a informação de que aquele clique específico virou cliente. É isso que
> permite a importação de conversões offline e a otimização automática por valor
> de lead. Se essa análise for importante, é uma alteração pequena de
> desenvolvimento — só precisa ser pedida.

| | |
|---|---|
| **O que enviar** | ID de conversão e rótulo de conversão, gerados no Google Ads em *Metas → Conversões* |
| **Formato** | `AW-123456789` e um rótulo como `AbC-D_efGh12` |
| **Onde é aplicado** | Dentro do **Google Tag Manager**, como tag de conversão — não no código do site |
| **Quem aplica** | Quem administra o GTM |
| **Precisa republicar?** | Não, desde que o GTM já esteja ativo |

---

## Analytics e Tag Manager

> **Estado:** ID recebido (`GTM-WLMW7J68`), aguardando aplicação na variável

O Google Tag Manager é a peça central: é dentro dele que Google Analytics, Google
Ads e qualquer outra tag de medição são ligados. O site não precisa ser alterado
a cada nova tag — basta o GTM estar ativo. **Por isso este é o primeiro valor a
providenciar**: sem ele, os IDs do Ads e do Analytics não têm onde ser usados.

> **Não é preciso colar o snippet no HTML.** O trecho que o Google (e as agências)
> mandam inserir no `<head>` e logo após o `<body>` **já está implementado** em
> `src/lib/gtm.ts`: o site injeta o mesmo `<script>` e o mesmo `<noscript>`,
> lendo o ID de uma variável. Colar o código à mão no `index.html` criaria uma
> segunda instalação do mesmo contêiner, com eventos duplicados — e sem passar
> pelo controle de consentimento.

| | |
|---|---|
| **O que enviar** | O ID do contêiner do Google Tag Manager |
| **Formato** | `GTM-XXXXXXX` — atual: `GTM-WLMW7J68` |
| **Onde é aplicado** | Variável `FRONTEND_ENV_PRODUCTION` no GitLab, na linha `VITE_GTM_ID` |
| **Quem aplica** | Desenvolvimento ou infraestrutura |
| **Precisa republicar?** | Sim — o valor entra no site durante a publicação |

Enquanto essa variável estiver com o valor de exemplo, o site **não carrega o
GTM**. Isso é proposital: evita que uma configuração pela metade dispare medição
errada. Trocar o valor sem rodar a publicação também não surte efeito.

> ⚠️ **Avisar a infraestrutura antes de aplicarem a Content-Security-Policy.** A
> política prevista bloqueia scripts de terceiros e derrubaria o GTM. Ela precisa
> liberar `https://www.googletagmanager.com` em `script-src` e
> `https://www.google-analytics.com` em `connect-src` (ver `PENDENCIAS_INFRA.md`,
> item 4). Se a CSP entrar antes desse ajuste, o tracking para de funcionar sem
> que ninguém relacione uma coisa à outra.

### Quando o GTM carrega — decisão em aberto

As instruções padrão do Google pedem o GTM "no `<head>`, o mais alto possível",
ou seja, carregando em toda visita. **O site não faz isso hoje**: o GTM só sobe
depois que o visitante aceita cookies de analytics.

A consequência prática importa para quem analisa os números: **quem recusar ou
ignorar o banner não gera dado nenhum**, nem mesmo os pings sem cookie que o
Google usa para modelagem de conversão. O volume virá menor do que o esperado.

| Modelo | Como funciona | Efeito |
|---|---|---|
| **Atual** | GTM só carrega após o aceite | Mais conservador; zero dado de quem não aceita |
| **Padrão do Google** | GTM carrega sempre; o Consent Mode v2 nega armazenamento até o aceite | Permite pings sem cookie e modelagem de conversão |

O site **já implementa o Consent Mode v2**, então migrar para o segundo modelo é
uma alteração pequena — deixar de condicionar o carregamento ao aceite, mantendo
os sinais de consentimento. É decisão de jurídico, não só técnica: recomendamos
começar pelo modelo atual e reavaliar se o volume de dados for insuficiente.

### Google Analytics

O GA4 não é configurado no site. Ele entra como uma tag dentro do GTM, usando o
ID de medição no formato `G-XXXXXXXXXX`.

### O que o site já envia

Estes eventos são disparados automaticamente e ficam disponíveis no GTM para
virarem conversões ou métricas. Não é preciso pedir nada para tê-los:

| Evento | Quando dispara |
|---|---|
| `page_view` | A cada página aberta, com idioma |
| `form_submit_contact` | Formulário de contato enviado |
| `form_submit_ebook` | Formulário de e-book enviado |
| `form_submit_newsletter` | Inscrição na newsletter |
| `form_submit_pre_whatsapp` | Formulário antes do WhatsApp |
| `click_cta_whatsapp` | Clique em botão de WhatsApp |
| `click_cta_rd_form` | Clique em CTA que abre uma Landing Page da RD |
| `click_product` | Clique em um produto |
| `click_post` | Clique em um artigo |
| `scroll_50` · `scroll_90` | Rolagem de metade e de quase toda a página |

Os eventos de formulário levam o identificador em `form_name` (ver *Identificação
de cada formulário*, na seção da RD Station), e os de CTA levam o slug do produto
em `cta_location`.

> Num produto configurado com `rdFormUrl`, o CTA abre a Landing Page da RD direto:
> ali dispara `click_cta_rd_form`, e **não** `click_cta_whatsapp` nem
> `form_submit_pre_whatsapp` — a conversão acontece dentro da RD. Vale considerar
> isso ao comparar volumes entre produtos com e sem formulário próprio.

---

## Hotjar

> **Estado:** aguardando ID

O Hotjar grava mapas de calor e sessões de navegação. O site também suporta o
Microsoft Clarity como alternativa, mas **apenas um dos dois roda por vez** — é
preciso escolher.

| | |
|---|---|
| **O que enviar** | O Site ID do Hotjar (número) — ou, se a escolha for Clarity, o Project ID |
| **Formato** | `3456789` para Hotjar · `a1b2c3d4e5` para Clarity |
| **Onde é aplicado** | Código do site, em `src/lib/endpoints.ts` |
| **Quem aplica** | Desenvolvimento |
| **Precisa republicar?** | Sim |

Diferente do GTM, este valor está escrito no código, então qualquer troca depende
de desenvolvimento. Se a intenção for que o marketing consiga ligar e desligar
sozinho, dá para movê-lo para uma variável de ambiente, no mesmo modelo do GTM.

---

## n8n

> **Estado:** envio congelado

O n8n é o fluxo que recebe os leads dos formulários e os encaminha adiante. Hoje
ele está **desligado no site, de propósito**.

> ⚠️ **Por que foi congelado.** Os endereços configurados eram de *teste*, e no
> n8n esse tipo de endereço só responde enquanto alguém está com o editor aberto.
> Na prática retornavam erro, e cada visitante que enviava um formulário via uma
> mensagem de falha.
>
> Com o envio congelado (`LEADS_TRANSPORT = "disabled"`), o site não tenta mais
> entregar nada a um endereço inexistente e mostra uma mensagem honesta de
> indisponibilidade. Nenhum lead está sendo perdido silenciosamente — mas também
> nenhum está sendo registrado por esse caminho.

| | |
|---|---|
| **O que enviar** | O endereço de produção do fluxo de leads, depois de publicado no n8n |
| **Formato** | `https://n8n.jtech.com.br/webhook/<id-do-fluxo>` — com `/webhook/`, nunca `/webhook-test/` |
| **Onde é aplicado** | Código do site, em `src/lib/endpoints.ts` |
| **Quem aplica** | Desenvolvimento |
| **Precisa republicar?** | Sim |

É necessário **um único endereço**, o do fluxo de leads. Existe uma segunda
constante no código (`N8N_CONTENT_WEBHOOK_URL`) que alimentaria um provedor de
conteúdo alternativo, mas ele não é usado — o site lê conteúdo do Strapi.

### O que o fluxo vai receber

Cada envio chega como um único pacote de dados com estes campos, o que permite
montar a automação sem depender de novas alterações no site:

- **Dados do contato** — nome, e-mail, empresa, cargo, telefone e mensagem,
  conforme o formulário
- **Origem do formulário** — qual formulário foi enviado e de qual página
- **Produto de interesse**, quando ligado a um produto ou e-book
- **Atribuição** — os cinco parâmetros `utm_`, o endereço completo de entrada e
  o site de origem
- **Consentimento** — o que o visitante aceitou no banner de cookies, no momento
  do envio
- **Idioma e data/hora** do envio

> **Os e-books não dependem do n8n.** Quem preenche o formulário para baixar um
> material fica registrado direto no Strapi, em *Ebook Lead*, com nome, e-mail,
> material, idioma e consentimento. Esses leads estão sendo capturados
> normalmente hoje.

---

## Consentimento: o que muda para a medição

> **Estado:** já implementado

O site tem banner de cookies em conformidade com a LGPD. Nada de medição carrega
antes de o visitante aceitar — e isso vale também para o GTM.

O site já informa ao Google, automaticamente, o que o visitante autorizou, usando
o padrão Consent Mode v2 (`ad_storage`, `ad_user_data`, `ad_personalization`,
`analytics_storage`). Mas há uma contrapartida do outro lado:

> ⚠️ **As tags dentro do GTM precisam respeitar esses sinais.** Se forem criadas
> sem a verificação de consentimento, disparam mesmo para quem recusou — e aí o
> banner deixa de ter efeito prático, com o risco jurídico que isso implica. No
> GTM, é a configuração de *verificações adicionais de consentimento* em cada tag.

Vale combinar isso com quem for montar as tags, antes de a medição entrar no ar.

---

## O que enviar, em resumo

A ordem importa: o GTM vem primeiro porque Ads e Analytics são ligados dentro
dele.

| Ordem | Valor | Formato | Onde nasce | Republicar? |
|---|---|---|---|---|
| 1 | ID do contêiner GTM | `GTM-WLMW7J68` ✅ recebido | Google Tag Manager | Sim |
| 2 | ID de medição do GA4 | `G-XXXXXXXXXX` | Google Analytics | Não |
| 3 | ID e rótulo de conversão | `AW-123456789` | Google Ads | Não |
| 4 | Endereços das Landing Pages | `https://…` | RD Station Marketing | Não |
| 5 | Endereço do fluxo de leads | `https://…/webhook/…` | n8n | Sim |
| 6 | Site ID do Hotjar | `3456789` | Hotjar | Sim |

### Duas decisões que também dependem do responsável

1. **Captura do `gclid`** — necessária para importar conversões no Google Ads e
   otimizar campanhas por valor de lead. Hoje não é capturado.
2. **Formulário da RD dentro do site** — em vez de abrir em nova aba. Muda o que
   se envia e exige ajuste na CSP antes.

Os valores marcados como "republicar: sim" entram no ar junto com a próxima
publicação do site. Vale agrupá-los para não fazer três publicações seguidas.
