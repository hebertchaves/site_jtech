import { factories } from '@strapi/strapi';
import { sanitizeForLogging } from '../../../utils/security';

// Formato conservador: valida estrutura, não existência do endereço.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const ALLOWED_LOCALES = ['pt-BR', 'en', 'es', 'fr'];

export default factories.createCoreController('api::ebook.ebook', ({ strapi }) => ({
  /**
   * POST /api/ebooks/:slug/download
   *
   * Troca um cadastro válido pelo link de download. O link nunca trafega antes
   * disso: downloadUrl é `private` no schema do e-book.
   *
   * Body: { name, email, locale, consentGiven, consentText? }
   */
  async requestDownload(ctx) {
    const { slug } = ctx.params;
    const { name, email, locale, consentGiven, consentText } = ctx.request.body || {};

    // ── Validação de entrada ──────────────────────────────────────────
    // Normaliza antes de validar: autocomplete de celular costuma mandar
    // espaço sobrando, e recusar por isso seria hostil sem ganho nenhum.
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (cleanName.length < 2 || cleanName.length > MAX_NAME_LENGTH) {
      return ctx.badRequest('Nome inválido');
    }

    if (cleanEmail.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(cleanEmail)) {
      return ctx.badRequest('E-mail inválido');
    }

    if (!ALLOWED_LOCALES.includes(locale)) {
      return ctx.badRequest('Idioma inválido');
    }

    // LGPD: sem consentimento não há tratamento — e nem download.
    if (consentGiven !== true) {
      return ctx.badRequest('Consentimento obrigatório');
    }

    try {
      // ── Busca do e-book (apenas publicados) ─────────────────────────
      // Document Service (API nativa do Strapi 5): é ela que respeita
      // `status: 'published'`. O entityService, usado no restante do projeto,
      // é legado e poderia devolver rascunho — e com ele o link de um material
      // que ainda não foi ao ar.
      const entries = await strapi.documents('api::ebook.ebook').findMany({
        filters: { slug },
        locale,
        status: 'published',
        limit: 1,
      });

      const ebook = entries?.[0] as { title?: string; downloadUrl?: string } | undefined;

      // Resposta idêntica para "não existe" e "não tem arquivo", para não
      // servir de oráculo sobre o acervo.
      if (!ebook || !ebook.downloadUrl) {
        return ctx.notFound('E-book não disponível para download');
      }

      // ── Registro do lead ────────────────────────────────────────────
      // Persistido antes de devolver o link: se a gravação falhar, o download
      // não acontece. É isso que sustenta a promessa do gating.
      await strapi.documents('api::ebook-lead.ebook-lead').create({
        data: {
          name: cleanName,
          email: cleanEmail,
          ebookSlug: slug,
          ebookTitle: ebook.title,
          locale,
          consentGiven: true,
          consentText: typeof consentText === 'string' ? consentText.slice(0, 1000) : null,
          ipAddress: ctx.request.ip || null,
          userAgent: ctx.request.headers['user-agent'] || null,
        } as any,
      });

      strapi.log.info('Ebook download liberado', { slug, locale });

      return ctx.send({ downloadUrl: ebook.downloadUrl });
    } catch (error) {
      strapi.log.error('Erro ao liberar download de e-book:', sanitizeForLogging(error));
      return ctx.internalServerError('Não foi possível liberar o download');
    }
  },
}));
