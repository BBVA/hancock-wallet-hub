# Hancock Wallet Hub

This microservice belonging to Hancock's ecosystem, allows you to send transactions to DLT and to sign the transactions with the help of a sign provider service previously configured.

## Overview

Hancock is a research product conceived within BBVA New digital business - R&D that provides convenient services to integrate with different DLT networks. We provide simplicity, adaptability and efficiently to develop in any DLT. Hancock can be divided into three main components:

- [DLT Adapter](https://github.com/BBVA/hancock-dlt-adapter) - Keep it simple
Interface to abstract interaction with different DLT networks.

- [Wallet Hub](https://github.com/BBVA/hancock-wallet-hub) - Enroute Interactions
Enable connect their signer wallets, or wallet service providers, to the wallet hub, that will then route any ready-to-sign transaction.

- [DLT Broker](https://github.com/BBVA/hancock-dlt-broker) - Real time notifications
Provides a websocket connection that propagates any DLT event the user is subscribed. Thus, provides an interface to easily and efficiently subscribe to blockchain asynchronous events to avoid constant request of status.

- SDKs - Provides a simplified consumption, minimizing the risk for errors and improving product quality
	- [Node.js](https://github.com/BBVA/hancock-sdk-nodejs)

  - [Java / Android](https://github.com/BBVA/hancock-sdk-java-android)


## Motivation

To be able to sign transactions in blockchain we need a private key. To avoid centralizing the user's private key we need to support different signature providers. In order to have different signature providers, we need to add a service to the system that will allow suppliers to be registered, making it possible for the system to be able to consume them, thus allowing a user to choose their signature provider.able to consume them, thus allowing a user to choose their signature provider.

### Current blockchains supported 

* Ethereum 

### Requirements

- [Node.js](https://nodejs.org/es/) >= v8.9.3 (npm v5.5.1)

## Using this package

Clone the project: 
```bash 
  # Clone the project  
  git clone https://github.com/BBVA/hancock-wallet-hub.git
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
available to configure the service in `config/custom-environment-variables.yaml`. 

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

Wallet-HUB provides some endpoints to interact with the blockchain, allowing send and sing transactions with an external signer to a specific DLT. Take a look at the diferent sections of the API [documentation](https://BBVA.github.io/hancock-wallet-hub/api.html) to see examples of use.

### Contribution guidelines 
 
If you are thinking about contributing to the project, you should know that: 
 
- The code has been written following the [clean architecture principles](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html), as well as [SOLID design principles](https://es.wikipedia.org/wiki/SOLID). 
 
- The project is built in [typescript](https://www.typescriptlang.org/) v2.9.2 using the [recommended guidelines](https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts). Also there is a linter rules configured to follow this guidelines, so you can search for a plugin for your favourite IDE to be warned about this linter errors. 
first version of docs
