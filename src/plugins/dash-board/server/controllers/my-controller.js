'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('dash-board')
      .service('myService')
      .getWelcomeMessage();
  },
});
