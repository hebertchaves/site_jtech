import { 
  generateSecureToken, 
  hashToken, 
  verifyTokenHash,
  sanitizeForLogging,
  maskToken 
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

  /**
   * Get preview content
   * GET /api/preview/:contentType?slug=...&locale=...
   * Header: X-Preview-Token
   * One-time use: token invalidated after first successful access
   */
  async show(ctx) {
    const { contentType } = ctx.params;
    const { slug, locale } = ctx.query;
    const receivedToken = ctx.request.headers['x-preview-token'];

    // Validate input
    if (!receivedToken) {
      return ctx.unauthorized('Missing X-Preview-Token header');
    }

    if (!slug || !locale) {
      return ctx.badRequest('Missing required query params: slug, locale');
    }

    if (!['post', 'ebook'].includes(contentType)) {
      return ctx.badRequest('Invalid contentType. Must be "post" or "ebook"');
    }

    try {
      // Hash received token
      const receivedHash = hashToken(receivedToken);

      // Find token by hash (NOT by plaintext)
      const previewTokens = await strapi.entityService.findMany(
        'api::preview-token.preview-token',
        {
          filters: {
            tokenHash: receivedHash,  // ✅ Compare hash
            contentType,
            slug,
            locale,
          },
        }
      );

      if (!previewTokens || previewTokens.length === 0) {
        strapi.log.warn('Invalid preview token attempt', {
          contentType,
          slug,
          locale,
          tokenPreview: maskToken(receivedToken),
        });
        return ctx.unauthorized('Invalid preview token');
      }

      const previewToken = previewTokens[0];

      // Check expiration
      if (new Date(previewToken.expiresAt) < new Date()) {
        // Delete expired token
        await strapi.entityService.delete(
          'api::preview-token.preview-token',
          previewToken.id
        );
        
        strapi.log.info('Expired preview token deleted', {
          id: previewToken.id,
          contentType,
          slug,
        });
        
        return ctx.unauthorized('Preview token expired');
      }

      // Check if already used (one-time use)
      if (previewToken.usedAt) {
        strapi.log.warn('Preview token reuse attempt', {
          id: previewToken.id,
          contentType,
          slug,
          usedAt: previewToken.usedAt,
        });
        return ctx.unauthorized('Preview token already used');
      }

      // Fetch content (including drafts)
      const apiName = contentType === 'post' ? 'api::post.post' : 'api::ebook.ebook';
      
      const entries = await strapi.entityService.findMany(apiName, {
        filters: {
          slug,
          locale,
        },
        populate: {
          image: true,
          category: true,
          author: true,
        },
        publicationState: 'preview', // ✅ Include drafts
      });

      if (!entries || entries.length === 0) {
        return ctx.notFound('Content not found');
      }

      // ✅ MARK TOKEN AS USED (one-time use)
      await strapi.entityService.update(
        'api::preview-token.preview-token',
        previewToken.id,
        {
          data: {
            usedAt: new Date(),
          } as any,
        }
      );

      strapi.log.info('Preview token used successfully', {
        id: previewToken.id,
        contentType,
        slug,
        locale,
      });

      // Return first match
      return ctx.send({ data: entries[0] });
    } catch (error) {
      strapi.log.error('Error fetching preview content:', sanitizeForLogging(error));
      return ctx.internalServerError('Failed to fetch preview content');
    }
  },
};
