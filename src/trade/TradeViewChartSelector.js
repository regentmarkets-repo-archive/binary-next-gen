import {
    assetsSelector,
    chartDataSelector,
    feedLicensesSelector,
    tradeParamsSelector,
    tradePurchaseInfoSelector,
    tradingTimesSelector,
    ticksSelector,
    ohlcSelector,
} from '../_store/directSelectors';
import { createSelector } from 'reselect';

import pipsToDigits from 'binary-utils/lib/pipsToDigits';

export const paramPerTrade = index => createSelector(
    [state => tradeParamsSelector(state).get(index), assetsSelector],
    (param, assets) => {
        const symbol = param.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        const symbolName = symbolDetails && symbolDetails.get('display_name');
        return param.set('symbolName', symbolName);
    }
);

const chartDataPerTrade = index => createSelector(
    [tradePurchaseInfoSelector, chartDataSelector],
    (purchaseInfo, chartData) => {
        const contractID = purchaseInfo.getIn([index, 'lastBoughtContract', 'contract_id']);
        return chartData.get(contractID);
    }
);

const lastBoughtContractPerTrade = index => createSelector(
    [tradePurchaseInfoSelector],
    purchaseInfo => purchaseInfo.getIn([index, 'lastBoughtContract'])
);

const tradingTimePerTrade = index => createSelector(
    [paramPerTrade(index), tradingTimesSelector],
    (param, times) => {
        const symbol = param.get('symbol');
        return times.find(a => a.get('symbol') === symbol);
    }
);

const ticksPerTrade = index => createSelector(
    [paramPerTrade(index), ticksSelector],
    (param, ticks) => {
        const symbol = param.get('symbol');
        return ticks.get(symbol);
    }
);

const ohlcPerTrade = index => createSelector(
    [paramPerTrade(index), ohlcSelector],
    (param, ticks) => {
        const symbol = param.get('symbol');
        return ticks.get(symbol);
    }
);

export const pipSizePerTrade = index => createSelector(
    [paramPerTrade(index), assetsSelector],
    (param, assets) => {
        const symbol = param.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        return symbolDetails && pipsToDigits(symbolDetails.get('pip'));
    }
);

export const feedLicensePerTrade = index => createSelector(
    [feedLicensesSelector, paramPerTrade(index)],
    (licenses, param) => {
        const symbol = param.get('symbol');
        return licenses.get(symbol);
    }
);

export const tradeViewChartPerTrade = index => createSelector(
    [
        chartDataPerTrade(index),
        lastBoughtContractPerTrade(index),
        tradingTimePerTrade(index),
        pipSizePerTrade(index),
        feedLicensePerTrade(index),
        paramPerTrade(index),
        ticksPerTrade(index),
        ohlcPerTrade(index),
    ],
    (chartData, lastBoughtContract, tradingTime, pipSize, license, param, ticks, ohlc) => ({
        index,
        ticks: chartData ? chartData.get('ticks') : ticks,
        ohlc: chartData ? chartData.get('ohlc') : ohlc,
        contractForChart: lastBoughtContract,
        tradeForChart: param,
        feedLicense: license,
        pipSize,
        tradingTime,
    })
);
