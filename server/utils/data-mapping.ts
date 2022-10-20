import { Brand, Category } from 'api-sdk'
import { StrapiBrand } from '../types/brand'
import { StrapiCategory } from '../types/category'

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

export const toStrapiCategory = (category: Category): StrapiCategory => {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    seo: {
      pageTitle: category.page_title,
      metaKeywords: category.meta_keywords.join(','),
      metaDescription: category.meta_description,
      searchKeywords: category.search_keywords,
    },
    imageUrl: category.image_url,
    path: category.custom_url.url,
    defaultProductSort: category.default_product_sort as StrapiCategory['defaultProductSort'],
    isVisible: category.is_visible,
    parent: category.parent_id,
  }
}
