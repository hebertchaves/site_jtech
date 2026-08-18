/**
 * Health Check Endpoint
 * 
 * Used by load balancers, Kubernetes probes, monitoring systems
 * 
 * GET /api/health
 * 
 * Returns:
 * - 200 OK if system is healthy (DB connected, Strapi running)
 * - 503 Service Unavailable if system is degraded
 */

export default {
  async index(ctx) {
    const startTime = Date.now();

    try {
      // Check database connectivity
      await strapi.db.connection.raw('SELECT 1');

      // Check if critical plugins are loaded
      const i18nLoaded = !!strapi.plugin('i18n');
      const usersLoaded = !!strapi.plugin('users-permissions');

      if (!i18nLoaded || !usersLoaded) {
        throw new Error('Critical plugins not loaded');
      }

      const responseTime = Date.now() - startTime;

      const isProduction = process.env.NODE_ENV === 'production';

      ctx.status = 200;
      // Em produção o endpoint é público (load balancer / monitoramento) e por
      // isso responde só o mínimo. Versão exata, uptime e ambiente eram um
      // convite a cruzar a instalação com CVEs conhecidas.
      ctx.body = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        responseTime: `${responseTime}ms`,
        database: 'connected',
        ...(isProduction
          ? {}
          : {
              uptime: process.uptime(),
              plugins: {
                i18n: i18nLoaded,
                usersPermissions: usersLoaded,
              },
              version: strapi.config.get('info.strapi'),
              environment: process.env.NODE_ENV || 'development',
            }),
      };
    } catch (error) {
      strapi.log.error('Health check failed:', error);

      ctx.status = 503;
      ctx.body = {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Service temporarily unavailable',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      };
    }
  },
};
