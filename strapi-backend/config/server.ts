export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // URL pública do Strapi (domínio do Nginx à frente da aplicação).
  // Usada para montar links absolutos: e-mail de reset de senha do admin,
  // redirects do painel e uploads locais (em prod a mídia vai por CDN_URL).
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
