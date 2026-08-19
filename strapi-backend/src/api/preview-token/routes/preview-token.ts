export default {
  routes: [
    {
      method: 'POST',
      path: '/preview-token',
      handler: 'preview-token.create',
      config: {
        policies: [],
        middlewares: ['plugin::users-permissions.rateLimit'], // Auth required, rate limited
      },
    },
    // GET /preview/:contentType foi removida daqui: a mesma rota é declarada em
    // api/preview-session e era ela que atendia as requisições (fluxo por cookie
    // HttpOnly). Manter as duas deixava a rota efetiva dependente da ordem de
    // carregamento do Strapi — em código de autenticação isso é inaceitável.
  ],
};