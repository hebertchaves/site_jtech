/**
 * Policy: is-preview-request
 * 
 * Validates preview token before allowing access to preview endpoint
 * Defense in depth: Additional layer before controller logic
 */

export default (policyContext, config, { strapi }) => {
  const token = policyContext.request.headers['x-preview-token'];

  // Check token presence
  if (!token || typeof token !== 'string' || token.trim() === '') {
    strapi.log.warn('Preview request rejected: Missing or invalid token header', {
      ip: policyContext.request.ip,
      url: policyContext.request.url,
    });
    
    return false;
  }

  // Token format validation (64 hex characters)
  const tokenRegex = /^[a-f0-9]{64}$/i;
  if (!tokenRegex.test(token)) {
    strapi.log.warn('Preview request rejected: Invalid token format', {
      ip: policyContext.request.ip,
      tokenLength: token.length,
    });
    
    return false;
  }

  // Policy passed - controller will validate token hash
  return true;
};
