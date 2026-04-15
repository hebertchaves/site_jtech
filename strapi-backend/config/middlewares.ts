export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: function () {
        // ✅ PRODUCTION HARDENING: Validate CORS_ORIGIN is configured
        const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim());
        
        // Fail-safe: Never allow missing CORS in production
        if (!allowedOrigins || allowedOrigins.length === 0) {
          if (process.env.NODE_ENV === 'production') {
            throw new Error(
              'FATAL: CORS_ORIGIN must be configured in production. ' +
              'Set CORS_ORIGIN env variable with comma-separated origins.'
            );
          }
          // Development fallback — include common Vite ports
          return [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:3000',
          ];
        }
        
        return allowedOrigins;
      }(),
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'X-Preview-Token', // Custom header for preview
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true, // ✅ ENABLE CREDENTIALS for cookie-based auth (preview sessions)
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];