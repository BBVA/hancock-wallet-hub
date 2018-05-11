
try {

  function initProviders() {

    ethereumDb = db.getSiblingDB("hancock");
    collection = ethereumDb['providers'];

    let res = [
      collection.drop(),
      collection.createIndex({ 'name': 1 }),
      collection.insert({ "alias": "signer-local", "endpoint": "http://hancock_sign_provider:3000/ethereum/request-tx-sign", "className": "Signer" }),
      collection.insert({ "alias": "signer-develop", "endpoint": "http://hancock_sign_provider:3000/ethereum/request-tx-sign", "className": "Signer" }),
      collection.insert({ "alias": "signer-demo", "endpoint": "http://hancock_sign_provider:3000/ethereum/request-tx-sign", "className": "Signer" }),
    ];

    printjson(res);
  }

  initProviders();

} catch (error) {

  print('Error, exiting', error);
  quit(1);

}

quit(0);