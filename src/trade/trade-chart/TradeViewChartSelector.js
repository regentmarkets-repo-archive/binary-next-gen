import {
    assetsSelector,
    boughtContractsSelector,
    chartDataSelector,
    feedLicensesSelector,
    tradeParamsSelector,
    tradePurchaseInfoSelector,
    tradingTimesSelector,
    ticksSelector,
    ohlcSelector,
} from '../../_store/directSelectors';
import { createSelector } from 'reselect';
import pipsToDigits from 'binary-utils/lib/pipsToDigits';

export const paramPerTrade = createSelector(
    [(state, props) => tradeParamsSelector(state).get(props.index), assetsSelector],
    (param, assets) => {
        const symbol = param.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        const symbolName = symbolDetails && symbolDetails.get('display_name');
        return param.set('symbolName', symbolName);
    }
);

const chartDataPerTrade = createSelector(
    [tradePurchaseInfoSelector, chartDataSelector, (state, props) => props.index],
    (purchaseInfo, chartData, index) => {
        const contractID = purchaseInfo.getIn([index, 'lastBoughtContract', 'contract_id']);
        return chartData.get(contractID);
    }
);

const tradingTimePerTrade = createSelector(
    [paramPerTrade, tradingTimesSelector],
    (param, times) => {
        const symbol = param.get('symbol');
        return times.find(a => a.get('symbol') === symbol);
    }
);

const ticksPerTrade = createSelector(
    [paramPerTrade, ticksSelector],
    (param, ticks) => {
        const symbol = param.get('symbol');
        return ticks.get(symbol);
    }
);

const ohlcPerTrade = createSelector(
    [paramPerTrade, ohlcSelector],
    (param, ticks) => {
        const symbol = param.get('symbol');
        return ticks.get(symbol);
    }
);

export const pipSizePerTrade = createSelector(
    [paramPerTrade, assetsSelector],
    (param, assets) => {
        const symbol = param.get('symbol');
        const symbolDetails = assets.find(a => a.get('symbol') === symbol);
        return symbolDetails && pipsToDigits(symbolDetails.get('pip'));
    }
);

export const feedLicensePerTrade = createSelector(
    [feedLicensesSelector, paramPerTrade],
    (licenses, param) => {
        const symbol = param.get('symbol');
        return licenses.get(symbol);
    }
);

const purchasePerTrade = (state, props) => tradePurchaseInfoSelector(state).get(props.index);

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
