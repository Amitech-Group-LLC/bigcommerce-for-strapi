export default [
  {
    method: 'GET',
    path: '/store/config',
    handler: 'storeConfig.get',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/store/config',
    handler: 'storeConfig.update',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/store/check',
    handler: 'storeSync.checkConnection',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/sync',
    handler: 'storeSync.createAllEntities',
    config: {
      policies: [],
    },
  },
];
