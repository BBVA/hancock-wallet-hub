
try {

  function initProviders() {

    ethereumDb = db.getSiblingDB("hancock");
    collection = ethereumDb['providers'];

    let res = [
      collection.drop(),
      collection.createIndex({ 'name': 1 }),
      collection.insert({ "providerName": "singleProvider", "protocol": "single", "singEndPoint": "https://kong-cryptvault-develop.kickstartteam.es/v1/wallets/:address/sign", "jwt": "", "recoverPkEndPoint": "" }),
      collection.insert({ "providerName": "secureProvider", "protocol": "secure", "singEndPoint": "http://hancock_sign_provider:3000/ethereum/sign-tx", "jwt": "", "recoverPkEndPoint": "https://kong-cryptvault-develop.kickstartteam.es:443/v1/wallets/:address" }),
    ];

    printjson(res);
  }

  initProviders();

} catch (error) {

  print('Error, exiting', error);
  quit(1);

}

quit(0);
