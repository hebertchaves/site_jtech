import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    sqlite: {
      connection: {
        // Usar filesystem Linux nativo para evitar problemas de permissão no WSL
        filename: env('DATABASE_FILENAME', '/home/hebertchaves/.strapi/jtech-cms/data.db'),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'jtech_strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', ''),
        ssl: env.bool('DATABASE_SSL', false)
          ? { rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
          : false,
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
