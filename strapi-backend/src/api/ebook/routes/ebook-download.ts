/**
 * Rota de liberação de download de e-book.
 *
 * O campo downloadUrl é `private` no schema, ou seja, nunca sai pela API
 * pública. A única forma de obtê-lo é enviando o formulário — o que torna o
 * gating real, e não apenas visual como era antes (o link vinha junto da
 * listagem e bastava abrir o DevTools para pegá-lo sem se cadastrar).
 */
export default {
  routes: [
    {
      method: 'POST',
      path: '/ebooks/:slug/download',
      handler: 'ebook.requestDownload',
      config: {
        auth: false, // Público por natureza: é o formulário de captação
        policies: [],
        middlewares: ['plugin::users-permissions.rateLimit'],
      },
    },
  ],
};
