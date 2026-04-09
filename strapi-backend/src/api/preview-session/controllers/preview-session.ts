import crypto from 'crypto';
import { hashToken, sanitizeForLogging } from '../../../utils/security';

const COOKIE_NAME = 'preview_session';
const SESSION_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Generate secure session ID (128-bit entropy)
 */
function generateSessionId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export default {
  /**
   * Create preview session
   * POST /api/preview/session
   * 
   * Body: { token, contentType, slug, locale }
   * Returns: Set-Cookie header with HttpOnly session
   * 
   * Security:
   * - Validates preview token (hash + one-time use + TTL)
   * - Creates server-side session (not accessible to JS)
   * - Returns HttpOnly + Secure + SameSite cookie
   * - Session scoped to contentType + slug + locale
   */
  async create(ctx) {
    const { token, contentType, slug, locale } = ctx.request.body;

    // Validate input
    if (!token || !contentType || !slug || !locale) {
      return ctx.badRequest('Missing required fields: token, contentType, slug, locale');
    }

    if (!['post', 'ebook'].includes(contentType)) {
      return ctx.badRequest('Invalid contentType. Must be "post" or "ebook"');
    }

    try {
      // ============================================
      // VALIDATE PREVIEW TOKEN (same logic as before)
      // ============================================
      const tokenHash = hashToken(token);

      const previewTokens = await strapi.entityService.findMany(
        'api::preview-token.preview-token',
        {
          filters: {
            tokenHash,
            contentType,
            slug,
            locale,
          },
        }
      );

      if (!previewTokens || previewTokens.length === 0) {
        strapi.log.warn('Invalid preview token for session creation', {
          contentType,
          slug,
          locale,
        });
        return ctx.unauthorized('Invalid preview token');
      }

      const previewToken = previewTokens[0];

      // Check expiration
      if (new Date(previewToken.expiresAt) < new Date()) {
        await strapi.entityService.delete(
          'api::preview-token.preview-token',
          previewToken.id
        );
        return ctx.unauthorized('Preview token expired');
      }

      // Check if already used
      if (previewToken.usedAt) {
        return ctx.unauthorized('Preview token already used');
      }

      // Mark token as used (one-time use)
      await strapi.entityService.update(
        'api::preview-token.preview-token',
        previewToken.id,
        {
          data: { usedAt: new Date() },
        }
      );

      // ============================================
      // CREATE SERVER-SIDE SESSION
      // ============================================
      const sessionId = generateSessionId();
      const expiresAt = new Date(Date.now() + SESSION_DURATION);

      // Audit info
      const userAgent = ctx.request.headers['user-agent'] || 'unknown';
      const ipAddress = ctx.request.ip || 'unknown';

      const session = await strapi.entityService.create(
        'api::preview-session.preview-session',
        {
          data: {
            sessionId,
            contentType,
            slug,
            locale,
            expiresAt,
            createdBy: previewToken.createdBy,
            userAgent,
            ipAddress,
          },
        }
      );

      strapi.log.info('Preview session created', {
        sessionId: sessionId.substring(0, 8) + '...', // Masked
        contentType,
        slug,
        locale,
        expiresAt,
      });

      // ============================================
      // SET HTTPONLY COOKIE
      // ============================================
      const isProduction = process.env.NODE_ENV === 'production';
      const cookieOptions = {
        httpOnly: true,       // ✅ JavaScript cannot access
        secure: isProduction, // ✅ HTTPS only in production
        sameSite: 'lax',     // ✅ CSRF protection (allows navigation from email/preview link)
        maxAge: SESSION_DURATION,
        path: '/',
        // domain: undefined, // Cookie sent to same origin only
      };

      ctx.cookies.set(COOKIE_NAME, sessionId, cookieOptions);

      // Return success (cookie is set in header)
      return ctx.send({
        success: true,
        expiresAt,
        message: 'Preview session created successfully',
      });
    } catch (error) {
      strapi.log.error('Error creating preview session:', sanitizeForLogging(error));
      return ctx.internalServerError('Failed to create preview session');
    }
  },

  /**
   * Get preview content using session cookie
   * GET /api/preview/:contentType
   * Query: slug, locale
   * Cookie: preview_session
   * 
   * Security:
   * - No X-Preview-Token header accepted (only cookie)
   * - Validates session exists, not expired, and scoped correctly
   * - Returns draft content if valid
   */
  async show(ctx) {
    const { contentType } = ctx.params;
    const { slug, locale } = ctx.query;

    // Validate input
    if (!slug || !locale) {
      return ctx.badRequest('Missing required query params: slug, locale');
    }

    if (!['post', 'ebook'].includes(contentType)) {
      return ctx.badRequest('Invalid contentType. Must be "post" or "ebook"');
    }

    try {
      // ============================================
      // VALIDATE SESSION COOKIE
      // ============================================
      const sessionId = ctx.cookies.get(COOKIE_NAME);

      if (!sessionId) {
        return ctx.unauthorized('Missing preview session. Please use preview link again.');
      }

      // Find session
      const sessions = await strapi.entityService.findMany(
        'api::preview-session.preview-session',
        {
          filters: {
            sessionId,
            contentType,
            slug,
            locale,
          },
        }
      );

      if (!sessions || sessions.length === 0) {
        strapi.log.warn('Invalid preview session or scope mismatch', {
          sessionId: sessionId.substring(0, 8) + '...',
          contentType,
          slug,
          locale,
        });
        return ctx.unauthorized('Invalid preview session or content scope');
      }

      const session = sessions[0];

      // Check expiration
      if (new Date(session.expiresAt) < new Date()) {
        // Delete expired session
        await strapi.entityService.delete(
          'api::preview-session.preview-session',
          session.id
        );

        // Clear cookie
        ctx.cookies.set(COOKIE_NAME, null);

        return ctx.unauthorized('Preview session expired. Please use preview link again.');
      }

      // ============================================
      // FETCH PREVIEW CONTENT
      // ============================================
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
        publicationState: 'preview', // Include drafts
      });

      if (!entries || entries.length === 0) {
        return ctx.notFound('Content not found');
      }

      strapi.log.info('Preview content accessed via session', {
        sessionId: sessionId.substring(0, 8) + '...',
        contentType,
        slug,
        locale,
      });

      return ctx.send({ data: entries[0] });
    } catch (error) {
      strapi.log.error('Error fetching preview content:', sanitizeForLogging(error));
      return ctx.internalServerError('Failed to fetch preview content');
    }
  },

  /**
   * Logout from preview session
   * POST /api/preview/logout
   * 
   * Deletes session from DB and clears cookie
   */
  async logout(ctx) {
    try {
      const sessionId = ctx.cookies.get(COOKIE_NAME);

      if (sessionId) {
        // Delete session from DB
        const sessions = await strapi.entityService.findMany(
          'api::preview-session.preview-session',
          {
            filters: { sessionId },
          }
        );

        if (sessions && sessions.length > 0) {
          await strapi.entityService.delete(
            'api::preview-session.preview-session',
            sessions[0].id
          );

          strapi.log.info('Preview session logged out', {
            sessionId: sessionId.substring(0, 8) + '...',
          });
        }
      }

      // Clear cookie (set Max-Age=0)
      ctx.cookies.set(COOKIE_NAME, null);

      return ctx.send({ success: true, message: 'Logged out from preview mode' });
    } catch (error) {
      strapi.log.error('Error during preview logout:', sanitizeForLogging(error));
      return ctx.internalServerError('Failed to logout');
    }
  },
};
