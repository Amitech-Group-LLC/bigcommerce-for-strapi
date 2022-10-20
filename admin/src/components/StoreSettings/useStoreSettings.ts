import { useState, useEffect, useMemo, useCallback } from 'react'
import pluginId from '../../pluginId'
import { request } from '@strapi/helper-plugin'
import { StoreSettings } from '../../types/storeSettings'

const useStoreSettings = () => {
  const [data, setData] = useState<StoreSettings>({
    clientSecret: '',
    hash: '',
    clientId: '',
    apiToken: '',
    channelId: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const storeSettings: StoreSettings = await request(
          `/${pluginId}/store/config`,
          { method: 'GET' }
        )
        setData(storeSettings)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const save = useCallback(async (updated: StoreSettings) => {
    try {
      setIsUpdating(true)
      const data: StoreSettings = await request(`/${pluginId}/store/config`, {
        method: 'POST',
        body: updated,
      })
      setData(data)
    } finally {
      setIsUpdating(false)
    }
  }, [])

  const checkConnection = useCallback(() => {
    return request<boolean>(`/${pluginId}/store/check`, {
      method: 'GET',
    })
  }, [])

  return useMemo(
    () => ({
      data,
      isLoading,
      save,
      isUpdating,
      checkConnection,
    }),
    [data, isLoading, save, isUpdating, checkConnection]
  )
}

export default useStoreSettings
