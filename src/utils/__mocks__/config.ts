const mock = {
  application: 'mockedApplicationName',
  hostname: 'mockedHostname',
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
  blockchain: {
    ethereum: {
      protocol: 'http',
      host: 'mockHost',
      port: 'mockPort'
    },
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
    hosts: 'mockDbHost:mockDbPort',
    params: 'mockDbParams',
    pass: 'mockDbPass',
    port: 'mockDbPort',
    protocol: 'mockDbProtocol',
    user: 'mockDbUser',
  },
  server: {
    protocol: 'mockprotocol',
    hosts: 'mockhost:mockport',
    externalPort: 'mockexternalport',
    base: 'mockbase',
    externalBase: 'mockexternalbase',
  },
  logger: {
    logLevel: 'mockedLogLevel',
  },
  headers: {
    hancockRequest: 'mockedHancockRequest',
  },
};

export default mock;
