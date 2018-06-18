/**
 * Return different store configurations, since dev needs debuging tools
 */

if (process.env.NODE_ENV === 'production')
  module.exports = require('./configure-store.prod')
else module.exports = require('./configure-store.dev')
