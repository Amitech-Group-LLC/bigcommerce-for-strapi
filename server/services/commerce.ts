import { Strapi } from '@strapi/strapi';
import { StoreSettings } from '../types/storeSettings'
import { config, timeZones, brands, categories } from 'api-sdk'
import { getAllItems, handleList } from '../utils/list-data'
import { toStrapiBrand, toStrapiCategory } from '../utils/data-mapping'

export default ({ strapi }: { strapi: Strapi }) => ({
  async setupClient() {
    const storeConfig: StoreSettings = await strapi.plugin('bigcommerce').service('storeConfig').get()
    config.set({
      storeHash: storeConfig.hash,
      apiClientId: storeConfig.clientId,
      apiToken: storeConfig.apiToken,
    })
  },
  async checkConnection() {
    try {
      await timeZones.getSystemTimestamp()
      return true
    } catch {
      return false
    }
  },
  async createAllBrands() {
    const result = await getAllItems((page) => brands.list({ limit: 250, page }))

    await handleList(result, async (brand) => {
      const data = toStrapiBrand(brand)

      try {
        await strapi.entityService.create('plugin::bigcommerce.brand', {
          data,
        })
      } catch {
        await strapi.entityService.update('plugin::bigcommerce.brand', data.id, {
          data,
        })
      }
    })

    return {
      total: result.length,
    }
  },
  async createAllCategories() {
    const result = await getAllItems((page) => categories.list({ limit: 250, page }))

    await handleList(result, async (category) => {
      // we should exclude relation because some categories can be not created yet
      const { parent: _, ...data } = toStrapiCategory(category)

      try {
        await strapi.entityService.create('plugin::bigcommerce.category', {
          data,
        })
      } catch {
        await strapi.entityService.update('plugin::bigcommerce.category', data.id, {
          data,
        })
      }
    })

    // add relations
    await handleList(result, async (category) => {
      const { parent, ...data } = toStrapiCategory(category)

      if (parent) {
        await strapi.entityService.update('plugin::bigcommerce.category', data.id, {
          data: { parent },
        })
      }
    })

    return {
      total: result.length,
    }
  },
});
