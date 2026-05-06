export default {
  /**
   * Cleanup expired tokens on server start
   */
  async afterCreate(event) {
    // Delete expired tokens (cleanup job)
    await strapi.db.query('api::preview-token.preview-token').deleteMany({
      where: {
        expiresAt: {
          $lt: new Date(),
        },
      },
    });
  },
};
