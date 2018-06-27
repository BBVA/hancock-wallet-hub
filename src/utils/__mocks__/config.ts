const mock = {
    api: {
      signTxResource: '/sign-tx',
      sendTxResource: '/send-tx',
      sendSignedTxResource: '/send-signed-tx',
      signedTxHookResource: '/signed-tx-hook',
    },
    application: 'applicationName',
    blockchain: {
      ethereum: {
        host: 'mockhost',
        port: 'mockport',
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
