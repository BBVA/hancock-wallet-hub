# Hancock Wallet Hub
====================

## Before use this package
This service send transactions to DLT and sign the transactions with the help of a sign provider configured before.

### Requirements
- [Node.js](https://nodejs.org/es/) >= v8.9.3 (npm v5.5.1)

## Using this package

### Installation

Once you have downloaded:

```bash
  # with npm
  npm install 

  # or using yarn
  yarn install
```

### Config environment

Once the installation of the service have finished, we need to fix some environment vars.

Parameters of server installation:

```bash
  hostname: HOSTNAME
  server:
    protocol: HANCOCK_SERVER_PROTOCOL
    host: HANCOCK_SERVER_HOST
    port: HANCOCK_SERVER_PORT
    externalPort: HANCOCK_SERVER_EXTERNAL_PORT
    base: HANCOCK_SERVER_BASE
    externalBase: HANCOCK_SERVER_EXTERNAL_BASE
```
Parameters of DLT that we used, in this example we fixed the config of Ethereum node.

```bash
  blockchain:
    ethereum:
      protocol: HANCOCK_BLOCKCHAIN_ETHEREUM_PROTOCOL
      host: HANCOCK_BLOCKCHAIN_ETHEREUM_HOST
      port: HANCOCK_BLOCKCHAIN_ETHEREUM_PORT
```
Parameters of MongoDB instance that storage data of signer.

```bash
  db:
    protocol: HANCOCK_DB_PROTOCOL
    hosts: HANCOCK_DB_HOSTS
    database: HANCOCK_DB_DATABASE
    params: HANCOCK_DB_PARAMS
    user: HANCOCK_DB_USER
    pass: HANCOCK_DB_PASS
    ethereum:
      database: HANCOCK_DB_ETHEREUM_DATABASE
```

Parameters of the signer selected to use with this service.

```bash
  cryptvault:
    api:
      getByAddressEndpoint: HANCOCK_CRYPTVAULT_GET_BY_ADDRESS_ENDPOINT
      signEndpoint: HANCOCK_CRYPTVAULT_SIGN_ENDPOINT
    credentials:
      key: HANCOK_CRYPTVAULT_KEY
      secret: HANCOCK_CRYPTVAULT_SECRET
      expires_in: HANCOCK_CRYPTVAULT_EXPIRES_IN
```
We need to insert a new raw in mongodb, into providers colection with the data of our signer.

```bash
{ "_id" : ObjectId("5afbe5839440cfd1b38f7819"), "alias" : "cryptvault", "className" : "CryptvaultSigner" }
```


### Introduction and examples

Wallet-HUB provides some endpoints to interact with the blockchain, 
allowing send and sing transactions with an external signer to a specific DLT. Take a look at the diferent sections of the [documentation](https://docs.kickstartteam.es/blockchainhub/kst-hancock-wallet-hub/docs/index.html) to see examples of use:

- [[api]]
- [[api.html]]