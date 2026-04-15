export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register({ strapi }) {
    // Register custom logic here
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    // ============================================
    // ENVIRONMENT VALIDATION (Production Safety)
    // ============================================
    const requiredEnvVars = [
      'APP_KEYS',
      'API_TOKEN_SALT',
      'ADMIN_JWT_SECRET',
      'JWT_SECRET',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      strapi.log.error(`FATAL: Missing required environment variables: ${missingVars.join(', ')}`);
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    // Validate CORS in production
    if (process.env.NODE_ENV === 'production' && !process.env.CORS_ORIGIN) {
      strapi.log.error('FATAL: CORS_ORIGIN must be set in production');
      throw new Error('CORS_ORIGIN must be configured in production');
    }

    strapi.log.info('Environment validation passed ✅');

    // ============================================
    // i18n CONFIGURATION
    // No Strapi 5, i18n é nativo no core (não mais plugin separado)
    // ============================================
    try {
      const i18nService = strapi.plugin('i18n')?.service('locales');

      if (i18nService) {
        const existingLocales = await i18nService.find();
        const requiredLocales = [
          { code: 'pt-BR', name: 'Portuguese (Brazil)' },
          { code: 'en', name: 'English' },
          { code: 'es', name: 'Spanish' },
          { code: 'fr', name: 'French' },
        ];

        for (const locale of requiredLocales) {
          const exists = existingLocales.find((l: { code: string }) => l.code === locale.code);
          if (!exists) {
            await i18nService.create(locale);
            strapi.log.info(`Created locale: ${locale.name} (${locale.code})`);
          }
        }
        strapi.log.info('i18n locales configured ✅');
      } else {
        strapi.log.warn('i18n plugin não disponível — configure locales manualmente no painel admin');
      }
    } catch (err) {
      strapi.log.warn('Aviso ao configurar locales i18n:', err);
    }

    // ============================================
    // CRON JOB: Preview Token Cleanup (Hourly)
    // ============================================
    const cron = require('node-cron');

    // Run every hour at minute 0
    cron.schedule('0 * * * *', async () => {
      try {
        strapi.log.info('Running preview cleanup job...');

        // Clean up expired preview tokens
        const deletedTokens = await strapi.db
          .query('api::preview-token.preview-token')
          .deleteMany({
            where: {
              $or: [
                // Delete expired tokens
                {
                  expiresAt: {
                    $lt: new Date(),
                  },
                },
                // Delete used tokens older than 24h
                {
                  usedAt: {
                    $notNull: true,
                    $lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  },
                },
              ],
            },
          });

        if (deletedTokens.count > 0) {
          strapi.log.info(`Cleaned up ${deletedTokens.count} preview tokens`);
        }

        // Clean up expired preview sessions
        const deletedSessions = await strapi.db
          .query('api::preview-session.preview-session')
          .deleteMany({
            where: {
              expiresAt: {
                $lt: new Date(),
              },
            },
          });

        if (deletedSessions.count > 0) {
          strapi.log.info(`Cleaned up ${deletedSessions.count} preview sessions`);
        }
      } catch (error) {
        strapi.log.error('Error in preview cleanup job:', error);
      }
    });

    strapi.log.info('Preview cleanup cron job scheduled (hourly) ✅');

    // ============================================
    // ONE-TIME CLEANUP on Startup
    // ============================================
    try {
      const deletedCount = await strapi.db
        .query('api::preview-token.preview-token')
        .deleteMany({
          where: {
            expiresAt: {
              $lt: new Date(),
            },
          },
        });

      if (deletedCount.count > 0) {
        strapi.log.info(`Startup cleanup: Removed ${deletedCount.count} expired preview tokens`);
      }
    } catch (error) {
      strapi.log.error('Error during startup token cleanup:', error);
    }
  },
};