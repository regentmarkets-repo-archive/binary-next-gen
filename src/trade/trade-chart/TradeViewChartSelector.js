import { createSelector } from 'reselect';
import { pipsToDigits } from 'binary-utils';
import {
    assetsSelector, boughtContractsSelector, chartDataSelector, feedLicensesSelector,
    tradePurchaseInfoSelector, tradingTimesSelector, ticksSelector, ohlcSelector,
} from '../../_store/directSelectors';
import { purchasePerTrade, paramPerTrade } from '../TradeSelectors';

const chartDataPerTrade = createSelector(
    [tradePurchaseInfoSelector, chartDataSelector, (state, props) => props.index],
    (purchaseInfo, chartData, index) => {
        const contractID = purchaseInfo.getIn([index, 'mostRecentContractId']);
        return chartData.get(contractID);
    }
);

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
        const contractID = purchaseInfo.get('mostRecentContractId');
        if (!contractID) return undefined;
        return contracts.get(contractID);
    }
);

export const tradeViewChartPerTrade = createSelector(
    [
        chartDataPerTrade,
        contractReceiptPerTrade,
        tradingTimePerTrade,
        pipSizePerTrade,
        feedLicensePerTrade,
        paramPerTrade,
        ticksPerTrade,
        ohlcPerTrade,
        (state, props) => props.index,
    ],
    (chartData, lastBoughtContract, tradingTime, pipSize, license, param, ticks, ohlc, index) => ({
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
