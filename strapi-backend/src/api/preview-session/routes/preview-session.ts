export default {
  routes: [
    {
      method: 'POST',
      path: '/preview/session',
      handler: 'preview-session.create',
      config: {
        auth: false, // Public endpoint (token validated in controller)
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/preview/:contentType',
      handler: 'preview-session.show',
      config: {
        auth: false, // Cookie-based auth (validated in controller)
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/preview/logout',
      handler: 'preview-session.logout',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
