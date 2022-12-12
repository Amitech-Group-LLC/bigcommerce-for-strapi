import { Strapi } from '@strapi/strapi'
import { StoreSettings } from '../types/storeSettings'
import {
  config,
  timeZones,
  brands,
  categories,
  products,
  getAllItems,
  handleList,
} from '@amitechgrp/bigcommerce-api-sdk'
import {
  toStrapiBrand,
  toStrapiCategory,
  toStrapiProduct,
} from '../utils/data-mapping'

export default ({ strapi }: { strapi: Strapi }) => ({
  async setupClient() {
    const storeConfig: StoreSettings = await strapi
      .plugin('bigcommerce')
      .service('storeConfig')
      .get()
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
    const result = await getAllItems(page => brands.list({ limit: 250, page }))

    await handleList(result, async brand => {
      const data = toStrapiBrand(brand)

      try {
        await strapi.entityService.create('plugin::bigcommerce.brand', {
          data,
        })
      } catch {
        await strapi.entityService.update(
          'plugin::bigcommerce.brand',
          data.id,
          {
            data,
          }
        )
      }
    })

    return {
      total: result.length,
    }
  },
  async createBrand(id: number) {
    const { data: brand } = await brands.get(id)
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
  },
  async updateBrand(id: number) {
    const { data: brand } = await brands.get(id)
    const data = toStrapiBrand(brand)

    try {
      await strapi.entityService.update('plugin::bigcommerce.brand', data.id, {
        data,
      })
    } catch {
      await strapi.entityService.create('plugin::bigcommerce.brand', {
        data,
      })
    }
  },
  async deleteBrand(id: number) {
    await strapi.entityService.delete('plugin::bigcommerce.brand', id)
  },
  async createCategory(id: number) {
    const { data: category } = await categories.get(id)
    const data = toStrapiCategory(category)

    try {
      await strapi.entityService.create('plugin::bigcommerce.category', {
        data,
      })
    } catch {
      await strapi.entityService.update(
        'plugin::bigcommerce.category',
        data.id,
        {
          data,
        }
      )
    }
  },
  async updateCategory(id: number) {
    const { data: category } = await categories.get(id)
    const data = toStrapiCategory(category)

    try {
      await strapi.entityService.create('plugin::bigcommerce.category', {
        data,
      })
    } catch {
      await strapi.entityService.update(
        'plugin::bigcommerce.category',
        data.id,
        {
          data,
        }
      )
    }
  },
  async deleteCategory(id: number) {
    await strapi.entityService.delete('plugin::bigcommerce.category', id)
  },
  async createProduct(id: number) {
    const { data: product } = await products.get(id)
    const data = toStrapiProduct(product)

    try {
      await strapi.entityService.create('plugin::bigcommerce.product', {
        data,
      })
    } catch {
      await strapi.entityService.update(
        'plugin::bigcommerce.product',
        data.id,
        {
          data,
        }
      )
    }
  },
  async updateProduct(id: number) {
    const { data: product } = await products.get(id)
    const data = toStrapiProduct(product)

    try {
      await strapi.entityService.create('plugin::bigcommerce.product', {
        data,
      })
    } catch {
      await strapi.entityService.update(
        'plugin::bigcommerce.product',
        data.id,
        {
          data,
        }
      )
    }
  },
  async deleteProduct(id: number) {
    await strapi.entityService.delete('plugin::bigcommerce.product', id)
  },
  async createAllCategories() {
    console.log('createAllCategories')
    const result = await getAllItems(page =>
      categories.list({ limit: 250, page })
    )
    console.log('all categories', result.length)

    await handleList(result, async category => {
      // we should exclude relation because some categories can be not created yet
      const { parent: _, ...data } = toStrapiCategory(category)

      try {
        await strapi.entityService.create('plugin::bigcommerce.category', {
          data,
        })
      } catch {
        await strapi.entityService.update(
          'plugin::bigcommerce.category',
          data.id,
          {
            data,
          }
        )
      }
    })

    // add relations
    await handleList(result, async category => {
      const { parent, id } = toStrapiCategory(category)

      if (parent) {
        try {
          await strapi.entityService.update(
            'plugin::bigcommerce.category',
            id,
            {
              data: { parent },
            }
          )
        } catch {
          console.log('category add relations error', id, parent)
        }
      }
    })

    return {
      total: result.length,
    }
  },

  async createAllProducts() {
    const result = await getAllItems(page =>
      products.list({
        limit: 250,
        page,
        include: ['images', 'primary_image', 'videos', 'custom_fields'],
      })
    )

    await handleList(
      result,
      async product => {
        // we should exclude relation because some products can be not created yet
        const { relatedProducts: _, ...data } = toStrapiProduct(product)

        try {
          await strapi.entityService.create('plugin::bigcommerce.product', {
            data,
          })
        } catch (e) {
          try {
            await strapi.entityService.update(
              'plugin::bigcommerce.product',
              data.id,
              {
                data,
              }
            )
          } catch (e) {
            console.log('Error adding product', data.id, e)
          }
        }
      },
      500,
      (from, to) => {
        console.log('handled products', from, to)
      }
    )

    // add relations
    await handleList(
      result,
      async product => {
        const { relatedProducts, ...data } = toStrapiProduct(product)

        if (relatedProducts.length) {
          await strapi.entityService.update(
            'plugin::bigcommerce.product',
            data.id,
            {
              data: { relatedProducts },
            }
          )
        }
      },
      500
    )

    return {
      total: result.length,
    }
  },
})
