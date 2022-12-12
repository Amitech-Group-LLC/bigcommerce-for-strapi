import { Seo } from './seo'

export type StrapiCategory = {
  id: number
  name: string
  description: string
  seo: Seo
  imageUrl: string
  path: string
  parent: number
  isVisible: boolean
  defaultProductSort:
    | 'use_store_settings'
    | 'featured'
    | 'newest'
    | 'best_selling'
    | 'alpha_asc'
    | 'alpha_desc'
    | 'avg_customer_review'
    | 'price_asc'
    | 'price_desc'
}
