import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkConnection(ctx) {
    ctx.body = await strapi
      .plugin('bigcommerce')
      .service('commerce')
      .checkConnection();
  },
  async createAllEntities(ctx) {
    try {
      const [brands, categories] = await Promise.all([
        await strapi
          .plugin('bigcommerce')
          .service('commerce')
          .createAllBrands(),
        await strapi
          .plugin('bigcommerce')
          .service('commerce')
          .createAllCategories()
      ])
      ctx.body = {
        brandsTotal: brands.total,
        categoriesTotal: categories.total,
      }
    } catch (e) {
      console.log('createAllEntities', e)
    }
  }
});
