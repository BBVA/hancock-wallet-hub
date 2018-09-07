// tslint:disable-next-line:variable-name
const __web3Instance__ = {
    eth: {
        net: {
            isListening: jest.fn(),
        },
    },
};

// tslint:disable-next-line:variable-name
const __web3Class__ = jest.fn().mockImplementation(() => __web3Instance__);

// tslint:disable-next-line:variable-name
const __websocketProvider__ = jest.fn().mockImplementation(() => ({}));

(__web3Class__ as any).__web3Instance__ = __web3Instance__;
(__web3Class__ as any).providers = {
    WebsocketProvider: __websocketProvider__,
    HttpProvider: __websocketProvider__,
};

export = __web3Class__;
