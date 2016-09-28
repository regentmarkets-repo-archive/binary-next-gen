import { createSelector } from 'reselect';
import { pipsToDigits } from 'binary-utils';
import {
    assetsSelector, boughtContractsSelector, feedLicensesSelector,
    tradingTimesSelector, ticksSelector, ohlcSelector,
} from '../../_store/directSelectors';
import { purchasePerTrade, paramPerTrade } from '../TradeSelectors';

const tradingTimePerTrade = createSelector(
    [paramPerTrade, tradingTimesSelector],
    (param, times) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        return times.find(a => a.get('symbol') === symbol);
    }
);

const ticksPerTrade = createSelector(
    [paramPerTrade, ticksSelector],
    (param, ticks) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        return ticks.get(symbol);
    }
);

const ohlcPerTrade = createSelector(
    [paramPerTrade, ohlcSelector],
    (param, ticks) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        return ticks.get(symbol);
    }
);

export const pipSizePerTrade = createSelector(
    [paramPerTrade, assetsSelector],
    (param, assets) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        return symbolDetails && pipsToDigits(symbolDetails.get('pip'));
    }
);

const feedLicensePerTrade = createSelector(
    [feedLicensesSelector, paramPerTrade],
    (licenses, param) => {
        if (!param) return undefined;
        const symbol = param.get('symbol');
        return licenses.get(symbol);
    }
);

export const contractReceiptPerTrade = createSelector(
    [purchasePerTrade, boughtContractsSelector],
    (purchaseInfo, contracts) => {
        if (!purchaseInfo) return undefined;
        const contractID = purchaseInfo.get('mostRecentContractId');
        if (!contractID) return undefined;
        return contracts.get(contractID);
    }
);

export const tradeViewChartPerTrade = createSelector(
    [
        contractReceiptPerTrade,
        tradingTimePerTrade,
        pipSizePerTrade,
        feedLicensePerTrade,
        paramPerTrade,
        ticksPerTrade,
        ohlcPerTrade,
        (state, props) => props.index,
    ],
    (lastBoughtContract, tradingTime, pipSize, license, param, ticks, ohlc, index) => ({
        index,
        contractForChart: lastBoughtContract,
        tradeForChart: param,
        feedLicense: license,
        pipSize,
        tradingTime,
    })
);
