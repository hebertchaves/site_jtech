# Guia de Deploy — Jtech Site + CMS na AWS

**Stack:** React + Vite (frontend) · Strapi 5 (CMS/backend) · PostgreSQL (banco) · AWS  
**Tempo estimado:** 2–3 horas

---

## Visão Geral da Arquitetura

```
Usuário
  │
  ▼
CloudFront (CDN + SSL)
  │
  ├── S3 Bucket "jtech-site"        ← arquivos estáticos do frontend (dist/)
  │
  └── EC2 Ubuntu (Strapi)           ← CMS backend na porta 1337
        │
        ├── RDS PostgreSQL          ← banco de dados
        │
        └── S3 Bucket "jtech-uploads" ← uploads de mídia do CMS
```

---

## Pré-requisitos

- Conta AWS com permissões de administrador
- Domínio `jtech.com.br` com acesso ao painel DNS
- Chave SSH `.pem` para acessar a EC2
- Node.js 20+ instalado localmente (para build do frontend)
- Código-fonte do projeto

---

## ETAPA 1 — RDS PostgreSQL

### 1.1 Criar o banco de dados

1. Console AWS → **RDS** → **Create database**
2. Configurações:
   - **Engine:** PostgreSQL 15
   - **Template:** Free tier (ou Production conforme necessidade)
   - **DB instance identifier:** `jtech-strapi`
   - **Master username:** `strapi`
   - **Master password:** _(gere uma senha forte e anote)_
   - **DB name:** `jtech_strapi`
   - **Instance type:** `db.t3.micro` (Free tier) ou `db.t3.small`
   - **Storage:** 20 GB GP2
   - **Public access:** **No**
   - **VPC:** padrão (mesma que será usada na EC2)
3. Clique em **Create database** e aguarde (~5 min)

### 1.2 Anotar o endpoint

Após criar, vá em **RDS → Databases → jtech-strapi** e copie o campo **Endpoint**.  
Formato: `jtech-strapi.xxxxxxxxx.us-east-1.rds.amazonaws.com`

> ⚠️ Guarde esse endpoint — será usado no `.env` do Strapi.

---

## ETAPA 2 — S3 Buckets

### 2.1 Bucket de uploads do Strapi (mídia)

1. Console AWS → **S3** → **Create bucket**
2. Configurações:
   - **Bucket name:** `jtech-uploads`
   - **Region:** mesma da EC2 (ex: `us-east-1`)
   - **Block all public access:** **desmarcar** _(as imagens precisam ser públicas)_
   - Confirme o aviso e clique em **Create bucket**
3. Após criar, vá em **Permissions → Bucket policy** e adicione:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::jtech-uploads/*"
    }
  ]
}
```

### 2.2 Bucket do frontend (site estático)

1. **S3** → **Create bucket**
2. Configurações:
   - **Bucket name:** `jtech-site`
   - **Region:** mesma da EC2
   - **Block all public access:** **desmarcar**
3. Após criar → **Properties** → **Static website hosting** → **Enable**
   - **Index document:** `index.html`
   - **Error document:** `index.html`
4. Em **Permissions → Bucket policy**, adicione:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::jtech-site/*"
    }
  ]
}
```

---

## ETAPA 3 — IAM User para o Strapi

O Strapi precisa de credenciais para fazer upload de imagens no S3.

1. Console AWS → **IAM** → **Users** → **Create user**
2. **Username:** `jtech-strapi-uploads`
3. **Permissions:** Attach policies directly → **Create policy**
4. Cole o JSON abaixo:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::jtech-uploads",
        "arn:aws:s3:::jtech-uploads/*"
      ]
    }
  ]
}
```

5. Nomeie a policy `jtech-strapi-s3` e salve
6. Volte ao usuário, anexe a policy criada e finalize
7. Vá em **Security credentials** → **Create access key** → **Application running outside AWS**
8. **Anote o `Access Key ID` e o `Secret Access Key`** — aparecem apenas uma vez

---

## ETAPA 4 — EC2 para o Strapi

### 4.1 Criar a instância

1. Console AWS → **EC2** → **Launch instance**
2. Configurações:
   - **Name:** `jtech-strapi`
   - **AMI:** Ubuntu Server 22.04 LTS
   - **Instance type:** `t3.small` _(mínimo recomendado para Strapi)_
   - **Key pair:** criar ou selecionar existente (guarde o arquivo `.pem`)
   - **Security Group:** criar novo com as regras abaixo:

| Tipo | Protocolo | Porta | Origem |
|------|-----------|-------|--------|
| SSH | TCP | 22 | Seu IP |
| HTTP | TCP | 80 | 0.0.0.0/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0 |
| Custom TCP | TCP | 1337 | 0.0.0.0/0 _(temporário — remover após Nginx configurado)_ |

3. **Anotar o IP público** após a instância iniciar

### 4.2 Conectar via SSH

```bash
chmod 400 sua-chave.pem
ssh -i sua-chave.pem ubuntu@IP_DA_EC2
```

### 4.3 Configurar o servidor

Execute os comandos abaixo na EC2:

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar versão (deve ser 20.x)
node --version

# PM2 — gerenciador de processos
sudo npm install -g pm2

# Nginx
sudo apt install -y nginx

# Certbot — certificados SSL
sudo apt install -y certbot python3-certbot-nginx

# Git (para clonar ou atualizar código)
sudo apt install -y git
```

### 4.4 Subir o código do Strapi

**Opção A — via SCP (copiar do computador local):**
```bash
# Executar no computador local (não na EC2)
# Certifique-se de NÃO incluir node_modules e .env
scp -i sua-chave.pem -r ./strapi-backend ubuntu@IP_DA_EC2:/home/ubuntu/jtech-cms
```

**Opção B — via Git:**
```bash
# Na EC2
git clone https://github.com/sua-org/jtech-site.git /home/ubuntu/jtech
cp -r /home/ubuntu/jtech/strapi-backend /home/ubuntu/jtech-cms
```

### 4.5 Criar o arquivo `.env` na EC2

```bash
cd /home/ubuntu/jtech-cms
nano .env
```

Cole o conteúdo abaixo, preenchendo com os valores reais coletados nas etapas anteriores:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Gerar cada valor com:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
APP_KEYS=GERAR_1,GERAR_2,GERAR_3,GERAR_4
API_TOKEN_SALT=GERAR
ADMIN_JWT_SECRET=GERAR
JWT_SECRET=GERAR

# Banco de dados (endpoint copiado na Etapa 1.2)
DATABASE_CLIENT=postgres
DATABASE_HOST=SEU_ENDPOINT.rds.amazonaws.com
DATABASE_PORT=5432
DATABASE_NAME=jtech_strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=SENHA_DO_RDS
DATABASE_SSL=true

# CORS — domínios do frontend (ajustar para os domínios reais)
CORS_ORIGIN=https://www.jtech.com.br,https://jtech.com.br

# AWS S3 — credenciais do IAM User criado na Etapa 3
AWS_ACCESS_KEY_ID=CHAVE_IAM
AWS_ACCESS_SECRET=SECRET_IAM
AWS_REGION=us-east-1
AWS_BUCKET=jtech-uploads
```

> Para gerar os secrets, execute na EC2:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
> ```
> Execute 4 vezes para os APP_KEYS e mais 3 para os demais secrets.

### 4.6 Instalar dependências e fazer build

```bash
cd /home/ubuntu/jtech-cms
npm install
npm run build
```

> ⚠️ O build do Strapi pode demorar 3–5 minutos na primeira vez.

### 4.7 Iniciar com PM2

```bash
cd /home/ubuntu/jtech-cms
pm2 start "npm run start" --name jtech-cms
pm2 save
pm2 startup
# Copie e execute o comando que o pm2 exibir (sudo env ...)
```

**Verificar se está rodando:**
```bash
pm2 status
pm2 logs jtech-cms --lines 50
```

O Strapi deve estar acessível em `http://IP_DA_EC2:1337`

---

## ETAPA 5 — Nginx + SSL na EC2

### 5.1 Configurar DNS antes do SSL

No painel DNS do domínio `jtech.com.br`, crie o registro:

| Tipo | Nome | Valor |
|------|------|-------|
| A | cms | IP_DA_EC2 |

Aguarde 5–15 minutos para propagar.

### 5.2 Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/jtech-cms
```

Cole:

```nginx
server {
    listen 80;
    server_name cms.jtech.com.br;

    # Aumentar limite para uploads de mídia
    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/jtech-cms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5.3 Emitir certificado SSL

```bash
sudo certbot --nginx -d cms.jtech.com.br
```

Siga as instruções. O Certbot configura o HTTPS automaticamente.

**Verificar renovação automática:**
```bash
sudo certbot renew --dry-run
```

### 5.4 Remover a porta 1337 do Security Group

Após o Nginx estar funcionando, volte ao console AWS → EC2 → Security Groups e **remova a regra da porta 1337** (ela era temporária).

---

## ETAPA 6 — Build e Deploy do Frontend

### 6.1 Preencher o `.env.production` (no computador local)

No arquivo `site-jtech/.env.production`, preencha o `VITE_CMS_URL` com o subdomínio do Strapi:

```env
VITE_CMS_URL=https://cms.jtech.com.br
VITE_CONTENT_MODE=strapi
VITE_N8N_LEAD_WEBHOOK=https://seu-n8n.com/webhook/jtech/lead
VITE_N8N_PRE_WHATSAPP_WEBHOOK=https://seu-n8n.com/webhook/jtech/pre-whatsapp
VITE_GTM_ID=GTM-XXXXXXX
```

### 6.2 Fazer o build

```bash
# Na raiz do projeto (site-jtech/)
npm install
npm run build
```

Será gerada a pasta `dist/`.

### 6.3 Upload para o S3

**Via AWS CLI:**
```bash
# Instalar AWS CLI se necessário
# https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

aws s3 sync ./dist s3://jtech-site --delete
```

**Via console AWS (manual):**
1. S3 → bucket `jtech-site` → **Upload**
2. Arraste todos os arquivos e pastas de dentro de `dist/`
3. Clique em **Upload**

---

## ETAPA 7 — CloudFront

### 7.1 Criar distribuição

1. Console AWS → **CloudFront** → **Create distribution**
2. Configurações:
   - **Origin domain:** selecionar o bucket `jtech-site`
   - **Origin access:** **Origin access control settings (recommended)**
   - Criar novo OAC se solicitado
   - **Viewer protocol policy:** Redirect HTTP to HTTPS
   - **Default root object:** `index.html`

### 7.2 Configurar erro 403/404 → index.html

Na distribuição → **Error pages** → **Create custom error response**:

| HTTP error code | Response page path | HTTP response code |
|---|---|---|
| 403 | /index.html | 200 |
| 404 | /index.html | 200 |

> Isso é necessário porque o site usa hash router (`#/rota`).

### 7.3 Configurar domínio customizado

1. Distribuição → **General** → **Edit**
2. **Alternate domain names (CNAMEs):** adicionar `jtech.com.br` e `www.jtech.com.br`
3. **Custom SSL certificate:** solicitar via ACM (AWS Certificate Manager)
   - ACM → **Request certificate** → DNS validation
   - Adicionar os registros CNAME no DNS do domínio
   - Aguardar validação (~5 min)
4. Selecionar o certificado na distribuição e salvar

### 7.4 Apontar DNS para o CloudFront

No painel DNS do domínio, adicione:

| Tipo | Nome | Valor |
|------|------|-------|
| CNAME | www | `xxxxxxxxxxxx.cloudfront.net` |
| CNAME (ou A ALIAS) | @ (raiz) | `xxxxxxxxxxxx.cloudfront.net` |

> O domínio do CloudFront aparece na distribuição, campo **Distribution domain name**.

---

## ETAPA 8 — Primeiro Acesso ao Strapi Admin

1. Acesse `https://cms.jtech.com.br/admin`
2. Crie a conta de administrador (primeiro acesso)
3. Vá em **Settings → API Tokens** e crie um token se o frontend precisar
4. Verifique se os content types (posts, ebooks, etc.) aparecem no menu lateral

---

## ETAPA 9 — Verificação Final

Execute cada item e confirme:

```
[ ] https://cms.jtech.com.br/admin  — painel Strapi acessível
[ ] https://cms.jtech.com.br/api/posts — API respondendo (pode retornar array vazio)
[ ] https://www.jtech.com.br — site frontend carregando
[ ] Upload de uma imagem no Strapi admin — verifica integração S3
[ ] Imagem carrega no site — verifica URL pública do S3
[ ] Formulário de contato — verifica webhook n8n (quando configurado)
[ ] Botão WhatsApp — abre chat com número correto (+55 48 99225-6034)
[ ] pm2 status — Strapi aparece como "online"
```

---

## Comandos Úteis — Manutenção

```bash
# Ver logs do Strapi em tempo real
pm2 logs jtech-cms

# Reiniciar após atualização de código
cd /home/ubuntu/jtech-cms
git pull  # ou novo scp
npm install
npm run build
pm2 restart jtech-cms

# Status dos serviços
pm2 status
sudo systemctl status nginx

# Renovar SSL manualmente (automático via cron)
sudo certbot renew

# Espaço em disco
df -h
```

---

## Informações para Repassar ao Time de Desenvolvimento

Após concluir o deploy, enviar ao time de dev:

| Informação | Valor |
|---|---|
| URL do Strapi Admin | https://cms.jtech.com.br/admin |
| URL da API | https://cms.jtech.com.br/api |
| URL do site | https://www.jtech.com.br |
| Endpoint do RDS | _(endpoint copiado na Etapa 1.2)_ |
| Região AWS | _(região escolhida)_ |
| Nome do bucket uploads | jtech-uploads |
| Subdomínio do Strapi confirmado | cms.jtech.com.br |

---

## Suporte

Em caso de dúvidas durante o deploy, entre em contato com o time de desenvolvimento fornecendo:
- O erro exato (mensagem + logs do `pm2 logs jtech-cms`)
- A etapa em que ocorreu o problema
