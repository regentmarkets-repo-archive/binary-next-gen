import { createSelector } from 'reselect';
import { Set } from 'immutable';
import { durationLarger, durationLesser, durationIsBetween } from '../_utils/TradeUtils';

const selectedAssetTicksSelector = state => {
    const fullTrade = state.trade.get('1').toJS();      // hardcoded 1 as fulltrade
    const selectedSymbol = fullTrade.symbol;
    const ticks = state.ticks.get(selectedSymbol).toJS();
    return {
        ticks,
    };
};

const durationInfo = (opts, duration, unit) => {
    const min = opts
        .map(opt => opt.min_contract_duration)
        .reduce((a, b) => durationLesser(a, b) ? a : b);

    const max = opts
        .map(opt => opt.max_contract_duration)
        .reduce((a, b) => durationLarger(a, b) ? a : b);

    return {
        min,
        max,
        unit,
        duration,
    };
};

// assuming number of barriers is same, barriers default depends on selectedDuration
const barriersInfo = (opts, selectedDuration) => {
    const relevantOpts = opts
        .filter(opt => durationIsBetween(selectedDuration, opt.min_contract_duration, opt.max_contract_duration));
    // choosing the 1st, as we just need some valid default
    const relevantOpt = relevantOpts[0];

    if (!relevantOpt) {     // selected duration could have no opts with barriers
        return [];
    }

    if (relevantOpt.barriers === 2) {
        return [
            {
                name: 'High barrier',
                defaultValue: relevantOpt.high_barrier,
            },
            {
                name: 'Low barrier',
                defaultValue: relevantOpt.low_barrier,
            },
        ];
    }
    if (relevantOpt.barriers === 1) {
        return [
            {
                name: 'Barrier',
                defaultValue: relevantOpt.barrier,
            },
        ];
    }

    return [];
};

const contractsSelector = state => {
    const fullTrade = state.trade.get('1').toJS();      // hardcoded 1 as fulltrade
    const selectedSymbol = fullTrade.symbol;
    const selectedDuration = fullTrade.duration;       // eg. '5'
    const selectedDurationUnit = fullTrade.durationUnit;       // eg. 'h'
    const selectedCategory = fullTrade.tradeCategory;

    const tradingOptions = state.tradingOptions.get(selectedSymbol);
    const relatedTradingOptions = tradingOptions.filter(opt => opt.contract_category === selectedCategory);

    // hardcoded logic due to backend does not return sufficient info...
    if (selectedCategory === 'callput') {
        // assuming barriers is either 0 or 1, should be true forever ....
        const rise = relatedTradingOptions.filter(opt => opt.barriers === 0 && opt.contract_type === 'CALL');
        const fall = relatedTradingOptions.filter(opt => opt.barriers === 0 && opt.contract_type === 'PUT');
        const higher = relatedTradingOptions.filter(opt => opt.barriers === 1 && opt.contract_type === 'CALL');
        const lower = relatedTradingOptions.filter(opt => opt.barriers === 1 && opt.contract_type === 'PUT');

        const riseDurationInfo = durationInfo(rise, selectedDuration, selectedDurationUnit);
        const fallDurationInfo = durationInfo(fall, selectedDuration, selectedDurationUnit);
        const higherDurationInfo = durationInfo(higher, selectedDuration, selectedDurationUnit);
        const lowerDurationInfo = durationInfo(lower, selectedDuration, selectedDurationUnit);

        const riseBarriersInfo = [];
        const fallBarriersInfo = [];
        const higherBarriersInfo = barriersInfo(higher, selectedDuration + selectedDurationUnit);
        const lowerBarriersInfo = barriersInfo(lower, selectedDuration + selectedDurationUnit);

        return [
            {
                name: 'Rise',
                value: 'CALL',
                durationInfo: riseDurationInfo,
                barriersInfo: riseBarriersInfo,
            },
            {
                name: 'Fall',
                value: 'PUT',
                durationInfo: fallDurationInfo,
                barriersInfo: fallBarriersInfo,
            },
            {
                name: 'Higher',
                value: 'CALL',
                durationInfo: higherDurationInfo,
                barriersInfo: higherBarriersInfo,
            },
            {
                name: 'Lower',
                value: 'PUT',
                durationInfo: lowerDurationInfo,
                barriersInfo: lowerBarriersInfo,
            },
        ];
    }

    const availableContractTypes = (new Set(relatedTradingOptions.map(opt => opt.contract_type))).toJS();
    const optionsGroupByType = availableContractTypes
        .map(type => relatedTradingOptions.filter(opt => opt.contract_type === type));
    const contractsGroupByType = optionsGroupByType.map(opts => {
        const durationInfoObj = durationInfo(opts, selectedDuration, selectedDurationUnit);
        const barriersInfoObj = barriersInfo(opts, selectedDuration + selectedDurationUnit);
        return {
            name: opts[0].contract_display_name,
            value: opts[0].contract_type,
            durationInfo: durationInfoObj,
            barriersInfo: barriersInfoObj,
        };
    });
    return contractsGroupByType;
};

const availableAssetsSelector = state => {
    const availables = state.assetSelector.get('availableAssets').toJS();
    return availables.map(asset => ({ text: asset.display_name, value: asset.symbol }));
};

const selectedAssetSelector = state => state.trade.getIn(['1', 'symbol']);

const tradingTypeSelector = state => {
    const fullTrade = state.trade.get('1').toJS();      // hardcoded 1 as fulltrade
    const selected = fullTrade.tradeCategory;
    const selectedSymbol = fullTrade.symbol;
    const relevantOptions = state.tradingOptions.get(selectedSymbol);

    const tempObj = {};
    relevantOptions.forEach(opt => { tempObj[opt.contract_category] = opt.contract_category_display; });

    const categories = Object.keys(tempObj).map(k => ({ text: tempObj[k], value: k }));
    return {
        allCategories: categories,
        selected,
    };
};

const payoutSelector = state => {
    const { basis, amount } = state.trade.get('1').toJS();
    const currency = state.account.get('currency');

    return {
        basis,
        amount,
        currency,
        onAmountChange: m => console.log(m),
        onBasisChange: m => console.log(m),
    };
};

export const fullTradeSelector = createSelector(
    selectedAssetSelector,
    tradingTypeSelector,
    selectedAssetTicksSelector,
    contractsSelector,
    payoutSelector,
    availableAssetsSelector,
    (selectedAsset, tradingTypeInfo, ticksInfo, contractOptions, payoutInfo, availableAssets) => ({
        selectedAsset,
        ticksInfo,
        contractOptions,
        tradingTypeInfo,
        payoutInfo,
        id: '1',
        availableAssets,
    })
);
