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
    // PUBLIC ROLE PERMISSIONS (Auto-configure)
    // Garante que o frontend consiga acessar a API sem autenticação.
    // Permissões ficam no banco (tabela up_permissions), então
    // se o DB for recriado elas se perdem. Este bloco recria
    // automaticamente em cada boot.
    // ============================================
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        // Buscar permissões existentes da role pública de uma vez
        const existingPerms = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({ where: { role: { id: publicRole.id } } });

        const existingActions = new Set(existingPerms.map((p: any) => p.action));

        const requiredActions = [
          'api::post.post.find',
          'api::post.post.findOne',
          'api::ebook.ebook.find',
          'api::ebook.ebook.findOne',
          'api::category.category.find',
          'api::category.category.findOne',
          'api::author.author.find',
          'api::author.author.findOne',
          // CTAs de produto: sem esta permissão o site recebe 403, cai no
          // fallback silencioso e ignora rdFormUrl e ctaLabel configurados
          // no painel — o sintoma é o botão continuar com o texto padrão.
          'api::product-cta-config.product-cta-config.find',
          'api::product-cta-config.product-cta-config.findOne',
        ];

        const missingActions = requiredActions.filter(a => !existingActions.has(a));

        if (missingActions.length > 0) {
          for (const action of missingActions) {
            await strapi
              .query('plugin::users-permissions.permission')
              .create({ data: { action, role: publicRole.id } });
            strapi.log.info(`Public permission granted: ${action}`);
          }

          // Forçar recarga do cache de permissões do plugin users-permissions
          // para que as novas permissões tenham efeito imediato (sem restart)
          try {
            const usersPermService = strapi.plugin('users-permissions').service('users-permissions');
            if (usersPermService?.initialize) {
              await usersPermService.initialize();
              strapi.log.info('Users-permissions cache reloaded after granting permissions');
            }
          } catch (cacheErr) {
            strapi.log.warn('Could not reload permissions cache — restart may be needed:', cacheErr);
          }

          strapi.log.info(`Created ${missingActions.length} missing public permissions ✅`);
        } else {
          strapi.log.info('Public API permissions already configured ✅');
        }
      } else {
        strapi.log.warn('Public role not found — permissions must be configured manually');
      }
    } catch (error) {
      strapi.log.warn('Could not auto-configure public permissions:', error);
    }

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