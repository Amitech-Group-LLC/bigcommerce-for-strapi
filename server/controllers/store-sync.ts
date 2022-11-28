import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkConnection(ctx) {
    ctx.body = await strapi
      .plugin('bigcommerce')
      .service('commerce')
      .checkConnection();
  },
  async createAllEntities(ctx) {
    console.log('createAllEntities')
    try {
      // const [brands, categories] = await Promise.all([
      //   await strapi
      //     .plugin('bigcommerce')
      //     .service('commerce')
      //     .createAllBrands(),
      //   await strapi
      //     .plugin('bigcommerce')
      //     .service('commerce')
      //     .createAllCategories()
      // ])
      const products = await strapi
        .plugin('bigcommerce')
        .service('commerce')
        .createAllProducts()
      ctx.body = {
        // brandsTotal: brands.total,
        // categoriesTotal: categories.total,
        productsTotal: products.total,
      }
    } catch (e) {
      console.log('createAllEntities', e)
    }
  },
  async productCreated(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async productUpdated(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async productDeleted(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async categoryCreated(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async categoryUpdated(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async categoryDeleted(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async brandCreated(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async brandUpdated(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async brandDeleted(ctx) {
    const { data: { id } } = ctx.request.body
  },
  async subscribeToUpdates(ctx) {

  }
});
