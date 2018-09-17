# Hancock Wallet Hub
====================

This microservice belonging to Hancock's ecosystem, allows you to send transactions to DLT and to sign the transactions with the help of a sign provider service previously configured.

### Current blockchains supported 

* Ethereum 

### Requirements

- [Node.js](https://nodejs.org/es/) >= v8.9.3 (npm v5.5.1)

## Using this package

Clone the project: 
```bash 
  # Clone the project  
  git clone ssh://git@bitbucket.kickstartteam.es:7999/bh/kst-hancock-ms-wallet-hub.git
  cd kst-hancock-ms-dlt-adapter 
``` 

### Installation

Once you have downloaded:

```bash
  # with npm
  npm install 
  nnpm run build:ts 
  npm run serve:prod 

  # or using yarn
  yarn install
  yarn run build:ts   
  yarn run serve:prod 
```

With [docker](https://www.docker.com/): 
```bash 
  # Build the docker image 
  docker build -t hancock_wallet_hub . 
  # Run the docker container 
  docker run -d -it --name -p 80:80 hancock_wallet_hub_container hancock_wallet_hub 
``` 

### Setting up the service 

Once the installation of the service have finished, we need to fix some environment vars. You can find all environment vars  
availables to configure the service in `config/custom-environment-variables.yaml`. 

An example of configuration of the most important vars:  
- Ethereum rpc node: 
```bash  
  export HANCOCK_BLOCKCHAIN_ETHEREUM_PROTOCOL="http"  
  export HANCOCK_BLOCKCHAIN_ETHEREUM_HOST="52.80.128.77"  
  export HANCOCK_BLOCKCHAIN_ETHEREUM_PORT="34774"  
```  
 
- Mongo ddbb host:  
```bash  
  export HANCOCK_DB_HOSTS="localhost:27017"  
  export HANCOCK_DB_DATABASE="hancock"  
  export HANCOCK_DB_ETHEREUM_DATABASE="hancock_eth"  
```  

### Select a sign provider

Before sign our transactions, we need to insert a new row in mongodb, into "providers" collection with the data of our signer.

 - "alias" : "fakeprovider"
 - "className" : "FakeProviderSigner" 

We have an specific option to configure Cryptvault like our signer, to that end, we need to fill the cryptvault environment vars of the config section.

## Introduction and examples

Wallet-HUB provides some endpoints to interact with the blockchain, allowing send and sing transactions with an external signer to a specific DLT. Take a look at the diferent sections of the API [documentation](https://docs.kickstartteam.es/blockchainhub/kst-hancock-ms-wallet-hub/docs/api.html) to see examples of use.

### Contribution guidelines 
 
If you are thinking in contribute to the project you should know that: 
 
- The code has been written following the [clean architecture principles](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html), as well as [SOLID design principles](https://es.wikipedia.org/wiki/SOLID). 
 
- The project is built in [typescript](https://www.typescriptlang.org/) v2.9.2 using the [recommended guidelines](https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts). Also there is a linter rules configured to follow this guidelines, so you can search for a plugin for your favourite IDE to be warned about this linter errors. 
first version of docs