/*
 *
 * HomePage
 *
 */

import * as React from 'react';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import pluginId from '../../pluginId'
import { request } from '@strapi/helper-plugin'
import getMessage from '../../utils/getMessage'
import StoreSettings from '../../components/StoreSettings'

const HomePage: React.VoidFunctionComponent = () => {
  const sync = async () => {
    await request(
      `/${pluginId}/sync`,
      { method: 'GET' }
    )
  }
  return (
    <Box background="neutral100">
      <HeaderLayout
        title={getMessage('plugin.name')}
        as="h2"
      />
      <ContentLayout>
        <Box background="neutral0" padding={4}>
          <StoreSettings />
          <Box paddingTop={4}>
            <Button onClick={sync}>Sync</Button>
          </Box>
        </Box>
      </ContentLayout>
    </Box>
  );
};

export default HomePage;
