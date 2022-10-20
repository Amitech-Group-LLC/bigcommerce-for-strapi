import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
  async get(ctx) {
    ctx.body = await strapi.plugin('bigcommerce').service('storeConfig').get()
  },
  async update(ctx) {
    ctx.body = await strapi
      .plugin('bigcommerce')
      .service('storeConfig')
      .update(ctx.request.body)
    await strapi.plugin('bigcommerce').service('commerce').setupClient()
  },
})
