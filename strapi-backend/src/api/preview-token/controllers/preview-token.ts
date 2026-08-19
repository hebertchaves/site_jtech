import {
  generateSecureToken,
  hashToken,
  sanitizeForLogging,
  maskToken,
} from '../../../utils/security';

export default {
  /**
   * Generate a preview token
   * POST /api/preview-token
   * Auth: Editor/Admin only
   * Rate limit: 10 per hour per user
   */
  async create(ctx) {
    const { contentType, slug, locale } = ctx.request.body;

    // Validate input
    if (!contentType || !slug || !locale) {
      return ctx.badRequest('Missing required fields: contentType, slug, locale');
    }

    if (!['post', 'ebook'].includes(contentType)) {
      return ctx.badRequest('Invalid contentType. Must be "post" or "ebook"');
    }

    // Generate secure token (64 hex chars)
    const token = generateSecureToken();
    const tokenHash = hashToken(token);

    // Calculate expiration (5 minutes for security)
    const expirationMs = parseInt(process.env.PREVIEW_TOKEN_EXPIRATION || '300000', 10);
    const expiresAt = new Date(Date.now() + expirationMs);

    // Get user info for audit
    const createdBy = ctx.state.user?.email || ctx.state.user?.username || 'unknown';

    try {
      // Create token in database (store HASH, not plaintext)
      const previewToken = await strapi.entityService.create(
        'api::preview-token.preview-token',
        {
          data: {
            tokenHash,      // ✅ HASH, not plaintext
            contentType,
            slug,
            locale,
            expiresAt,
            createdBy,
            usedAt: null,   // Track first use
          },
        }
      );

      // Log token creation (sanitized)
      strapi.log.info('Preview token created', {
        id: previewToken.id,
        contentType,
        slug,
        locale,
        createdBy,
        expiresAt,
        tokenPreview: maskToken(token), // Only log masked token
      });

      // Return plaintext token ONLY in response (never stored)
      return ctx.send({
        token,  // ✅ Original token returned once
        expiresAt: previewToken.expiresAt,
      });
    } catch (error) {
      strapi.log.error('Error creating preview token:', sanitizeForLogging(error));
      return ctx.internalServerError('Failed to create preview token');
    }
  },
};
