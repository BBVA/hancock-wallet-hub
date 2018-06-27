const mock = {
  api: {
    signTxResource: '/sign-tx',
    sendTxResource: '/send-tx',
    sendSignedTxResource: '/send-signed-tx',
    signedTxHookResource: '/signed-tx-hook',
  },
  cryptvault: {
    api: {
      getByAddressEndpoint: 'mockgetbyAddress',
      notifyEndpoint: 'mockNotify',
      signEndpoint: 'mockSign',
    },
    credentials: {
      expires_in: 'mockexpires',
      key: 'mockkey',
      secret: 'mocksecret',
    },
  },
  application: 'applicationName',
  blockchain: {
    ethereum: 'mockBlockchain',
  },
  db: {
    ethereum: {
      collections: {
        contracts: 'mockDatabaseCollectionContracts',
        providers: 'mockDatabaseCollectionProviders',
      },
      database: 'mockDatabase',
    },
    database: 'mockDbDatabase',
    host: 'mockDbHost',
    params: 'mockDbParams',
    pass: 'mockDbPass',
    port: 'mockDbPort',
    protocol: 'mockDbProtocol',
    user: 'mockDbUser',
  },
  server: {
    protocol: 'mockprotocol',
    host: 'mockhost',
    port: 'mockport',
    externalPort: 'mockexternalport',
    base: 'mockbase',
    externalBase: 'mockexternalbase',
  },
};

export default mock;
