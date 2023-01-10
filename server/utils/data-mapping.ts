import { Brand, Category, Product } from '@amitechgrp/bigcommerce-api-sdk'
import { StrapiBrand } from '../types/brand'
import { StrapiCategory } from '../types/category'
import { StrapiProduct } from '../types/product'

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
    path: category.custom_url?.url || `/${category.name}`,
    defaultProductSort:
      category.default_product_sort as StrapiCategory['defaultProductSort'],
    isVisible: category.is_visible,
    parent: category.parent_id,
  }
}

export const toStrapiProduct = (product: Product): StrapiProduct => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    seo: {
      pageTitle: product.page_title,
      metaKeywords: product.meta_keywords?.join(',') || '',
      metaDescription: product.meta_description,
      searchKeywords: product.search_keywords,
    },
    type: product.type as StrapiProduct['type'],
    sku: product.sku,
    price: product.price,
    costPrice: product.cost_price,
    retailPrice: product.retail_price,
    salePrice: product.sale_price,
    mapPrice: product.map_price,
    calculatedPrice: product.calculated_price,
    categories: product.categories,
    brand: product.brand_id || null,
    inventoryLevel: product.inventory_level,
    inventoryWarningLevel: product.inventory_warning_level,
    inventoryTracking: product.inventory_tracking as StrapiProduct['inventoryTracking'],
    fixedCostShippingPrice: product.fixed_cost_shipping_price,
    isFreeShipping: product.is_free_shipping,
    isVisible: product.is_visible,
    isFeatured: product.is_featured,
    relatedProducts: product.related_products?.filter(id => id > 0) || [],
    warranty: product.warranty,
    binPickingNumber: product.bin_picking_number,
    upc: product.upc,
    availabilityDescription: product.availability_description,
    availability: product.availability as StrapiProduct['availability'],
    giftWrappingOptionsType: product.gift_wrapping_options_type as StrapiProduct['giftWrappingOptionsType'],
    sortOrder: product.sort_order,
    condition: product.condition as StrapiProduct['condition'],
    isConditionShown: product.is_condition_shown,
    orderQuantityMinimum: product.order_quantity_minimum,
    orderQuantityMaximum: product.order_quantity_maximum,
    preorderReleaseDate: product.preorder_release_date,
    preorderMessage: product.preorder_message,
    isPreorderOnly: product.is_preorder_only,
    isPriceHidden: product.is_price_hidden,
    priceHiddenLabel: product.price_hidden_label,
    path: product.custom_url?.url || `/${product.id}/`,
    openGraph: {
      type: product.open_graph_type as StrapiProduct['openGraph']['type'],
      title: product.open_graph_title,
      description: product.open_graph_description,
      useMetaDescription: product.open_graph_use_meta_description,
      useProductName: product.open_graph_use_product_name,
      useImage: product.open_graph_use_image,
    },
    gtin: product.gtin,
    mpn: product.mpn,
    customFields: product.custom_fields?.map((field) => ({
      id: field.id,
      name: field.name,
      value: field.value,
    })) || [],
    images: product.images?.map((image) => ({
      isThumbnail: image.is_thumbnail,
      sortOrder: image.sort_order,
      description: image.description,
      imageUrl: image.image_url,
      urlZoom: image.url_zoom,
      urlStandard: image.url_standard,
      urlThumbnail: image.url_thumbnail,
      urlTiny: image.url_tiny,
    })) || [],
    videos: product.videos?.map((video) => ({
      type: video.type as 'youtube',
      sortOrder: video.sort_order,
      title: video.title,
      description: video.description,
      videoId: video.video_id,
    })) || [],
    baseVariantId: product.base_variant_id,
  }
}
