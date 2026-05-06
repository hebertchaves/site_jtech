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
    {
      method: 'GET',
      path: '/preview/:contentType',
      handler: 'preview-token.show',
      config: {
        auth: false, // Token-based auth via custom header
        policies: ['global::is-preview-request'], // Validate token before controller
        middlewares: ['plugin::users-permissions.rateLimit'],
      },
    },
  ],
};