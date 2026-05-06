import crypto from 'crypto';

/**
 * Generate secure random token (32 bytes = 64 hex chars)
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash token using SHA-256
 * Use this to store token hash in database (never store plaintext)
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Verify token against stored hash
 */
export function verifyTokenHash(token: string, storedHash: string): boolean {
  const computedHash = hashToken(token);
  return crypto.timingSafeEqual(
    Buffer.from(computedHash, 'hex'),
    Buffer.from(storedHash, 'hex')
  );
}

/**
 * Sanitize object for logging (remove sensitive data)
 */
export function sanitizeForLogging(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = Array.isArray(obj) ? [...obj] : { ...obj };
  const sensitiveKeys = [
    'token',
    'tokenHash',
    'password',
    'authorization',
    'x-preview-token',
    'jwt',
    'secret',
    'api_key',
    'apiKey',
  ];

  for (const key in sanitized) {
    const lowerKey = key.toLowerCase();
    
    // Remove sensitive keys
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      sanitized[key] = '[REDACTED]';
      continue;
    }

    // Sanitize email (show only domain)
    if (lowerKey.includes('email') && typeof sanitized[key] === 'string') {
      const email = sanitized[key];
      const [, domain] = email.split('@');
      sanitized[key] = `***@${domain || '[REDACTED]'}`;
      continue;
    }

    // Recursively sanitize nested objects
    if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeForLogging(sanitized[key]);
    }
  }

  return sanitized;
}

/**
 * Mask token for logging (show only first 8 and last 4 chars)
 */
export function maskToken(token: string): string {
  if (!token || token.length < 12) return '[REDACTED]';
  return `${token.substring(0, 8)}...${token.substring(token.length - 4)}`;
}

/**
 * Validate URL to prevent SSRF attacks
 */
export function isValidPublicURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    // Block localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return false;
    }

    // Block private IP ranges
    const privateRanges = [
      /^10\./,                    // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
      /^192\.168\./,              // 192.168.0.0/16
      /^169\.254\./,              // Link-local
      /^fd[0-9a-f]{2}:/i,         // IPv6 private
      /^fe80:/i,                  // IPv6 link-local
    ];

    if (privateRanges.some(range => range.test(hostname))) {
      return false;
    }

    // Block AWS metadata endpoint
    if (hostname === '169.254.169.254') {
      return false;
    }

    // Only allow http/https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
