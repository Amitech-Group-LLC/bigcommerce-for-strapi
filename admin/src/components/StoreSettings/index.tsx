import * as React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@strapi/design-system/Button'
import { Box } from '@strapi/design-system/Box'
import { Flex } from '@strapi/design-system/Flex'
import { TextInput } from '@strapi/design-system/TextInput'
import { Typography } from '@strapi/design-system/Typography'
import getMessage from '../../utils/getMessage'
import useStoreSettings from './useStoreSettings'

const StoreSettings = () => {
  const { data, isUpdating, save, checkConnection } = useStoreSettings()
  const [updatedData, setUpdatedData] = useState(data)
  const [isValid, setIsValid] = useState(data)

  const onCheckConnection = useCallback(async () => {
    const isValid = await checkConnection()
    setIsValid(isValid)
  }, [checkConnection])

  useEffect(() => {
    setUpdatedData(data)
  }, [data])

  return (
    <Box paddingBottom={4}>
      <form>
        <Box paddingBottom={4}>
          <Typography variant="delta">
            {getMessage('settings.title')}
          </Typography>
        </Box>
        <Box paddingBottom={2}>
          <TextInput
            label={getMessage('settings.hashLabel')}
            name="hash"
            value={updatedData?.hash ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedData(state => ({
                ...state,
                hash: e.target.value,
              }))
            }}
            required
          />
        </Box>
        <Box paddingBottom={2}>
          <TextInput
            label={getMessage('settings.apiTokenLabel')}
            name="apiToken"
            value={updatedData?.apiToken ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedData(state => ({
                ...state,
                apiToken: e.target.value,
              }))
            }}
            required
          />
        </Box>
        <Box paddingBottom={2}>
          <TextInput
            label={getMessage('settings.clientIdLabel')}
            name="clientId"
            value={updatedData?.clientId ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedData(state => ({
                ...state,
                clientId: e.target.value,
              }))
            }}
            required
          />
        </Box>
        <Box paddingBottom={4}>
          <TextInput
            label={getMessage('settings.clientSecretLabel')}
            name="clientSecret"
            value={updatedData?.clientSecret ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedData(state => ({
                ...state,
                clientSecret: e.target.value,
              }))
            }}
            required
          />
        </Box>
        <Box paddingBottom={4}>
          <TextInput
            label={getMessage('settings.channelIdLabel')}
            name="channelId"
            value={updatedData?.channelId ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUpdatedData(state => ({
                ...state,
                channelId: e.target.value,
              }))
            }}
            required
          />
        </Box>
        <Flex justifyContent="space-between">
          <Box paddingRight={4}>
            <Button disabled={isUpdating} onClick={() => save(updatedData)}>
              {getMessage('settings.saveButton')}
            </Button>
          </Box>
          <Box>
            <Flex>
              <Box paddingRight={4}>
                {isValid ? (
                  <Typography>
                    {getMessage('settings.successConnection')}
                  </Typography>
                ) : (
                  <Typography>
                    {getMessage('settings.errorConnection')}
                  </Typography>
                )}
              </Box>
              <Button onClick={onCheckConnection} variant="secondary">
                Check connection
              </Button>
            </Flex>
          </Box>
        </Flex>
      </form>
    </Box>
  )
}

export default StoreSettings
