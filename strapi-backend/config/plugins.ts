export default ({ env }) => {
  const accessKeyId = env('AWS_ACCESS_KEY_ID');
  const secretAccessKey = env('AWS_SECRET_ACCESS_KEY', env('AWS_ACCESS_SECRET'));
  const sessionToken = env('AWS_SESSION_TOKEN');

  const credentials =
    accessKeyId && secretAccessKey
      ? {
          credentials: {
            accessKeyId,
            secretAccessKey,
            ...(sessionToken ? { sessionToken } : {}),
          },
        }
      : {};

  return {
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
        jwtSecret: env('JWT_SECRET'),
      },
    },

    // Upload provider: S3 em produção, local em desenvolvimento.
    // Se não houver chaves explícitas, o AWS SDK usa a cadeia padrão de credenciais
    // e permite rodar no ECS com task role.
    ...(env('NODE_ENV') === 'production' && {
      upload: {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            s3Options: {
              region: env('AWS_REGION', 'us-east-1'),
              ...credentials,
              params: {
                Bucket: env('AWS_BUCKET'),
              },
            },
          },
          actionOptions: {
            upload: { ACL: null },
            uploadStream: { ACL: null },
            delete: {},
          },
        },
      },
    }),
  };
};
