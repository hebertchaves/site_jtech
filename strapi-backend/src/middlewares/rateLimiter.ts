/**
 * Rate Limiter Middleware
 * Protects sensitive endpoints from abuse
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetAt: number;
  };
}

const store: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetAt < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  windowMs: number;  // Time window in milliseconds
  max: number;       // Max requests per window
  keyGenerator?: (ctx: any) => string;  // Custom key generator
}

export function createRateLimiter(config: RateLimitConfig) {
  const {
    windowMs,
    max,
    keyGenerator = (ctx) => ctx.request.ip || 'unknown',
  } = config;

  return async (ctx: any, next: () => Promise<void>) => {
    const key = keyGenerator(ctx);
    const now = Date.now();

    // Initialize or get existing record
    if (!store[key] || store[key].resetAt < now) {
      store[key] = {
        count: 0,
        resetAt: now + windowMs,
      };
    }

    // Increment counter
    store[key].count++;

    // Check limit
    if (store[key].count > max) {
      const retryAfter = Math.ceil((store[key].resetAt - now) / 1000);
      
      ctx.set('Retry-After', String(retryAfter));
      ctx.status = 429;
      ctx.body = {
        error: {
          status: 429,
          name: 'TooManyRequests',
          message: 'Rate limit exceeded. Please try again later.',
          details: {
            retryAfter: `${retryAfter}s`,
          },
        },
      };
      return;
    }

    // Set rate limit headers
    ctx.set('X-RateLimit-Limit', String(max));
    ctx.set('X-RateLimit-Remaining', String(max - store[key].count));
    ctx.set('X-RateLimit-Reset', String(Math.ceil(store[key].resetAt / 1000)));

    await next();
  };
}

/**
 * Rate limiter for preview token generation
 * Max 10 per hour per user
 */
export const previewTokenGenerationLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  keyGenerator: (ctx) => {
    // Rate limit per authenticated user
    const userId = ctx.state.user?.id || ctx.state.user?.email;
    return userId ? `preview-gen:${userId}` : `preview-gen:${ctx.request.ip}`;
  },
});

/**
 * Rate limiter for preview content access
 * Max 30 per minute per IP
 */
export const previewContentAccessLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  keyGenerator: (ctx) => `preview-access:${ctx.request.ip}`,
});

/**
 * General API rate limiter
 * Max 100 per minute per IP
 */
export const generalApiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  keyGenerator: (ctx) => `api:${ctx.request.ip}`,
});
