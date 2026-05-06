# Jtech CMS - Strapi 5 Backend

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd strapi-backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and set your secrets (APP_KEYS, JWT_SECRET, etc)
```

### 3. Run Development Server
```bash
npm run develop
```

Admin panel: http://localhost:1337/admin

### 4. Create Admin User
On first run, create your admin user via the browser.

---

## 📦 Content Types

### Post (Collection Type)
- **i18n enabled:** pt-BR, en, es, fr
- **Draft/Publish:** Enabled
- **Fields:**
  - `title` (string, i18n, required)
  - `slug` (uid, i18n, unique per locale)
  - `excerpt` (text, i18n)
  - `content` (richtext, i18n)
  - `image` (media, single image)
  - `category` (relation → Category)
  - `author` (relation → Author)
  - `readTime` (integer, 1-60)

### Ebook (Collection Type)
- **i18n enabled:** pt-BR, en, es, fr
- **Draft/Publish:** Enabled
- **Fields:**
  - `title` (string, i18n, required)
  - `slug` (uid, i18n, unique per locale)
  - `description` (text, i18n)
  - `content` (richtext, i18n)
  - `image` (media, single image)
  - `pages` (integer)
  - `category` (string)
  - `downloadUrl` (string)
  - `ctaType` (enum: RD_FORM | DIRECT_DOWNLOAD | EXTERNAL_LINK)
  - `rdFormUrl` (string, optional)

### Category (Collection Type)
- **i18n enabled:** Yes
- **Draft/Publish:** Disabled
- **Fields:**
  - `name` (string, i18n, required)
  - `slug` (uid)
  - `posts` (relation → Post)

### Author (Collection Type)
- **Draft/Publish:** Disabled
- **Fields:**
  - `name` (string, required)
  - `slug` (uid)
  - `posts` (relation → Post)

### Preview Token (Collection Type - Internal)
- **Auto-cleanup:** Expired tokens removed on bootstrap
- **Fields:**
  - `token` (string, unique)
  - `contentType` (enum: post | ebook)
  - `slug` (string)
  - `locale` (string)
  - `expiresAt` (datetime)

---

## 🔒 Permissions

### Public Role
Configure in **Settings → Roles → Public**:

**Post:**
- ✅ `find` (only published)
- ✅ `findOne` (only published)

**Ebook:**
- ✅ `find` (only published)
- ✅ `findOne` (only published)

**Category:**
- ✅ `find`
- ✅ `findOne`

**Author:**
- ✅ `find`
- ✅ `findOne`

**Preview (Custom Routes):**
- ✅ `preview/:contentType` (GET) - Token-based auth

### Editor Role
Create custom role "Editor" in **Settings → Roles**:

**All content types:**
- ✅ Create, Read, Update (own content)
- ❌ Delete (only admins)

**Preview Token:**
- ✅ `create` (POST /api/preview-token)

---

## 🔗 API Endpoints

### Public Endpoints

**Get Latest Posts:**
```
GET /api/posts?locale=pt-BR&sort=publishedAt:desc&pagination[limit]=3&populate=*
```

**Get Post by Slug:**
```
GET /api/posts?filters[slug][$eq]=automacao-industrial-2026&locale=pt-BR&populate=*
```

**Get Latest Ebooks:**
```
GET /api/ebooks?locale=pt-BR&sort=publishedAt:desc&pagination[limit]=3&populate=*
```

**Get Ebook by Slug:**
```
GET /api/ebooks?filters[slug][$eq]=guia-automacao&locale=pt-BR&populate=*
```

### Preview Endpoints

**Generate Preview Token (Auth required):**
```bash
POST /api/preview-token
Authorization: Bearer <ADMIN_JWT>
Content-Type: application/json

{
  "contentType": "post",
  "slug": "automacao-industrial-2026",
  "locale": "pt-BR"
}

Response:
{
  "token": "abc123...",
  "expiresAt": "2026-03-02T12:30:00.000Z"
}
```

**Get Preview Content:**
```bash
GET /api/preview/post?slug=automacao-industrial-2026&locale=pt-BR
X-Preview-Token: abc123...

Response:
{
  "data": { ... }  // Includes drafts
}
```

---

## 🧪 Testing Preview

### 1. Create Draft Post
In Strapi Admin:
1. Content Manager → Posts → Create new entry
2. Select locale: `pt-BR`
3. Fill title: "Meu Post Draft"
4. Fill slug: `meu-post-draft`
5. **Save** (don't publish!)

### 2. Generate Preview Token
```bash
curl -X POST http://localhost:1337/api/preview-token \
  -H "Authorization: Bearer YOUR_ADMIN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "contentType": "post",
    "slug": "meu-post-draft",
    "locale": "pt-BR"
  }'
```

Response:
```json
{
  "token": "abc123def456...",
  "expiresAt": "2026-03-02T12:30:00.000Z"
}
```

### 3. Access Preview
```bash
curl -X GET "http://localhost:1337/api/preview/post?slug=meu-post-draft&locale=pt-BR" \
  -H "X-Preview-Token: abc123def456..."
```

Should return the draft content!

### 4. Test Expiration
Wait 30 minutes (or change `PREVIEW_TOKEN_EXPIRATION` to 60000 = 1 min for testing).

Try accessing again → Should return `401 Unauthorized`.

---

## 📝 Seed Data (Optional)

After creating admin user, manually create:

**Authors:**
1. João Silva (slug: `joao-silva`)
2. Maria Santos (slug: `maria-santos`)
3. Carlos Oliveira (slug: `carlos-oliveira`)

**Categories (with translations):**
1. **Tecnologia**
   - pt-BR: Tecnologia
   - en: Technology
   - es: Tecnología
   - fr: Technologie

2. **Inovação**
   - pt-BR: Inovação
   - en: Innovation
   - es: Innovación
   - fr: Innovation

3. **Eficiência**
   - pt-BR: Eficiência
   - en: Efficiency
   - es: Eficiencia
   - fr: Efficacité

**Posts (use mock data from frontend as reference):**
Create 3 posts with translations in all 4 locales.

---

## 🔄 Migration to Production

### 1. Database
Change `.env` to use PostgreSQL:
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=jtech_strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your-secure-password
```

### 2. Build
```bash
npm run build
```

### 3. Start
```bash
NODE_ENV=production npm start
```

### 4. Environment Variables
Set all secrets in production:
- `APP_KEYS` (4 random strings)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `JWT_SECRET`
- `CORS_ORIGIN` (your frontend URLs)

---

## 📚 Documentation

- Strapi 5 Docs: https://docs.strapi.io/dev-docs/intro
- i18n Plugin: https://docs.strapi.io/dev-docs/plugins/i18n
- Custom Routes: https://docs.strapi.io/dev-docs/backend-customization/routes

---

## 🐛 Troubleshooting

**Issue:** Preview tokens not working
- Check CORS: Make sure `X-Preview-Token` is in allowed headers
- Check token expiration: Default is 30 min
- Check logs: `strapi.log.error` in controller

**Issue:** i18n locales not appearing
- Check `src/index.ts` bootstrap function
- Restart server after adding locales
- Check Admin → Settings → Internationalization

**Issue:** Images not loading
- Check upload plugin configuration
- For production, use S3 or Cloudinary provider
- Verify CORS allows image domain

---

**Strapi Backend Ready!** 🎉
Next: Integrate with React frontend via `StrapiContentProvider`
