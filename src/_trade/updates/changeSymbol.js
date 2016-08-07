import createDefaultTradeParams from '../defaults/createDefaultTradeParams';

export default (symbol, contract, isOpen = true) =>
    createDefaultTradeParams(contract, symbol, isOpen);
