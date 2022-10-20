import { Strapi } from '@strapi/strapi';
import { StoreSettings } from '../types/storeSettings'

export default ({ strapi }: { strapi: Strapi }) => ({
  get() {
    return strapi.entityService.findOne('plugin::bigcommerce.store-config', 1)
  },
  async update(params: StoreSettings) {
    const alreadyExist = await this.get().catch(() => null)
    if (alreadyExist) {
      return strapi.entityService.update('plugin::bigcommerce.store-config', 1, {
        data: params,
      })
    }
    return strapi.entityService.create('plugin::bigcommerce.store-config', {
      data: params,
    })
  }
});
