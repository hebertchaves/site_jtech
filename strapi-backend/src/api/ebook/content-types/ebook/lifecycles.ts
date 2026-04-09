import { isValidPublicURL } from '../../../../utils/security';

export default {
  /**
   * Validate ebook data before create/update
   * Prevents SSRF via downloadUrl
   */
  async beforeCreate(event) {
    const { data } = event.params;

    // Validate downloadUrl
    if (data.downloadUrl) {
      if (!isValidPublicURL(data.downloadUrl)) {
        throw new Error(
          'Invalid download URL: URLs must be public and use HTTP/HTTPS protocol. ' +
          'Private IPs, localhost, and metadata endpoints are not allowed.'
        );
      }
    }

    // Validate rdFormUrl
    if (data.rdFormUrl) {
      if (!isValidPublicURL(data.rdFormUrl)) {
        throw new Error(
          'Invalid RD form URL: URLs must be public and use HTTP/HTTPS protocol.'
        );
      }
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    // Validate downloadUrl
    if (data.downloadUrl) {
      if (!isValidPublicURL(data.downloadUrl)) {
        throw new Error(
          'Invalid download URL: URLs must be public and use HTTP/HTTPS protocol. ' +
          'Private IPs, localhost, and metadata endpoints are not allowed.'
        );
      }
    }

    // Validate rdFormUrl
    if (data.rdFormUrl) {
      if (!isValidPublicURL(data.rdFormUrl)) {
        throw new Error(
          'Invalid RD form URL: URLs must be public and use HTTP/HTTPS protocol.'
        );
      }
    }
  },
};
