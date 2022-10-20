import { Brand } from 'api-sdk'
import { StrapiBrand } from '../types/brand'

export const toStrapiBrand = (brand: Brand): StrapiBrand => {
  return {
    id: brand.id,
    name: brand.name,
    seo: {
      pageTitle: brand.page_title,
      metaKeywords: brand.meta_keywords.join(','),
      metaDescription: brand.meta_description,
      searchKeywords: brand.search_keywords,
    },
    imageUrl: brand.image_url,
    path: brand.custom_url.url,
  }
}
