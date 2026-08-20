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

> **Estado:** aguardando ID do contêiner

O Google Tag Manager é a peça central: é dentro dele que Google Analytics, Google
Ads e qualquer outra tag de medição são ligados. O site não precisa ser alterado
a cada nova tag — basta o GTM estar ativo. **Por isso este é o primeiro valor a
providenciar**: sem ele, os IDs do Ads e do Analytics não têm onde ser usados.

| | |
|---|---|
| **O que enviar** | O ID do contêiner do Google Tag Manager |
| **Formato** | `GTM-XXXXXXX` |
| **Onde é aplicado** | Variável `FRONTEND_ENV_PRODUCTION` no GitLab, na linha `VITE_GTM_ID` |
| **Quem aplica** | Desenvolvimento ou infraestrutura |
| **Precisa republicar?** | Sim — o valor entra no site durante a publicação |

Enquanto essa variável estiver com o valor de exemplo, o site **não carrega o
GTM**. Isso é proposital: evita que uma configuração pela metade dispare medição
errada. Trocar o valor sem rodar a publicação também não surte efeito.

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
| `click_product` | Clique em um produto |
| `click_post` | Clique em um artigo |
| `scroll_50` · `scroll_90` | Rolagem de metade e de quase toda a página |

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
| 1 | ID do contêiner GTM | `GTM-XXXXXXX` | Google Tag Manager | Sim |
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
