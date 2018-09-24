import config from './config';
import logger from './logger';

// tslint:disable-next-line:no-var-requires
const web3 = require('web3');

let web3Instance: any;

export function initWeb3() {

  const cfg: any = config.blockchain.ethereum;
  if (cfg.protocol === 'ws' || cfg.protocol === 'wss') {
    logger.debug(`Creating WebsocketProvider...`);
    web3Instance = new web3(new web3.providers.WebsocketProvider(`${cfg.protocol}://${cfg.host}:${cfg.port}`));

  } else if (cfg.protocol === 'http' || cfg.protocol === 'https') {
    logger.debug(`Creating HttpProvider...`);
    web3Instance = new web3(new web3.providers.HttpProvider(`${cfg.protocol}://${cfg.host}:${cfg.port}`));

  } else {
    const msg = `Can not connect to Ethereum. Protocol: ${cfg.protocol}. Use http or ws`;
    logger.error(msg);
    throw Error(msg);
  }

}

export async function getWeb3() {

  let connReady: boolean;

  try {

    connReady = !!web3Instance && await web3Instance.eth.net.isListening();

  } catch (e) {

    connReady = false;

  }

  if (!connReady) {
    try {
      initWeb3();
      logger.debug(`Web3 initialized`);

    } catch (e) {
      throw e;
    }
  }

  return web3Instance;

}
