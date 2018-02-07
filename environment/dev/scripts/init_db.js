
try {

  function initProviders() {

    ethereumDb = db.getSiblingDB("ETH");
    collection = ethereumDb['providers'];

    let res = [
      collection.drop(),
      collection.createIndex({ 'name': 1 }),
      collection.insert({ "alias": "covault", "endpoint": "https://covault/eth/request-sign" }),
      collection.insert({ "alias": "mock", "endpoint": "http://hancock_mock_provider/request-sign" }),
    ];

    printjson(res);
  }

  initProviders();

} catch (error) {

  print('Error, exiting', error);
  quit(1);

}

quit(0);