'use strict';

/**
 * new-letter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-letter.new-letter');
