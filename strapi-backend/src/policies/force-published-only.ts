/**
 * Policy: force-published-only
 * 
 * Ensures Public role can ONLY access published content
 * Defense in depth: Even if RBAC is misconfigured, drafts won't leak
 */

export default (policyContext, config, { strapi }) => {
  const { state, query } = policyContext;

  // If user is authenticated (Admin/Editor), allow preview
  if (state.user) {
    return true;
  }

  // For Public (unauthenticated), force published only
  // Override any publicationState query param
  if (query.publicationState) {
    query.publicationState = 'live';
  }

  // Add filter to ensure only published content
  if (!query.filters) {
    query.filters = {};
  }

  // Force publishedAt to exist (means it's published)
  query.filters.publishedAt = {
    $notNull: true,
  };

  strapi.log.debug('Public access: forcing published content only', {
    route: policyContext.request.url,
  });

  return true;
};
