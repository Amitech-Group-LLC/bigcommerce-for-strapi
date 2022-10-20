import { Strapi } from '@strapi/strapi';
import { StoreSettings } from '../types/storeSettings'
import { config, timeZones, brands } from 'api-sdk'
import { getAllItems, handleList } from '../utils/list-data'
import { toStrapiBrand } from '../utils/data-mapping'

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
});
