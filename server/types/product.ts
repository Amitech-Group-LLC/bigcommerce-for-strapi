import { Seo } from './seo'

export type StrapiProduct = {
  id: number
  name: string
  seo: Seo
  type: 'digital' | 'physical'
  sku: string
  description: string
  price: number
  costPrice: number
  retailPrice: number
  salePrice: number
  mapPrice: number
  calculatedPrice: number
  categories: number[]
  brand: number | null
  inventoryLevel: number
  inventoryWarningLevel: number
  inventoryTracking: 'none' | 'product' | 'variant'
  fixedCostShippingPrice: number
  isFreeShipping: boolean
  isVisible: boolean
  isFeatured: boolean
  relatedProducts: number[]
  warranty: string
  binPickingNumber: string
  upc: string
  availabilityDescription: string
  availability: 'available' | 'disabled' | 'preorder'
  giftWrappingOptionsType: 'any' | 'none' | 'list'
  sortOrder: number
  condition: 'New' | 'Used' | 'Refurbished'
  isConditionShown: boolean
  orderQuantityMinimum: number
  orderQuantityMaximum: number
  preorderReleaseDate: string
  preorderMessage: string
  isPreorderOnly: boolean
  isPriceHidden: boolean
  priceHiddenLabel: string
  path: string
  openGraph: {
    type:
      | 'product'
      | 'category'
      | 'album'
      | 'book'
      | 'drink'
      | 'food'
      | 'game'
      | 'movie'
      | 'song'
      | 'tv_show'
    title: string
    description: string
    useMetaDescription: boolean
    useProductName: boolean
    useImage: boolean
  }
  gtin: string
  mpn: string
  customFields: {
    id: number
    name: string
    value: string
  }[]
  images: {
    isThumbnail: boolean
    sortOrder: number
    description: string
    imageUrl: string
    urlZoom: string
    urlStandard: string
    urlThumbnail: string
    urlTiny: string
  }[]
  videos: {
    type: 'youtube'
    sortOrder: number
    title: string
    description: string
    videoId: string
  }[]
  baseVariantId: number
}
