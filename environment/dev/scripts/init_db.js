
try {

  function initProviders() {

    ethereumDb = db.getSiblingDB("hancock");
    collection = ethereumDb['providers'];

    let res = [
      collection.drop(),
      collection.createIndex({ 'name': 1 }),
      collection.insert({ "alias": "fake-provider-local", "endpoint": "http://hancock_sign_provider:3000/ethereum/sign-tx", "className": "Signer" }),
      collection.insert({ "alias": "fake-provider-develop", "endpoint": "http://hancock_sign_provider:3000/ethereum/sign-tx", "className": "Signer" }),
      collection.insert({ "alias": "fake-provider-demo", "endpoint": "http://hancock_sign_provider:3000/ethereum/sign-tx", "className": "Signer" }),
      collection.insert({ "alias": "cryptvault", "className": "CryptvaultSigner" }),
    ];

    printjson(res);
  }

  initProviders();

} catch (error) {

  print('Error, exiting', error);
  quit(1);

}

quit(0);