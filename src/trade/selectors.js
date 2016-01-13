import { createSelector } from 'reselect';
import { Set } from 'immutable';
import { durationLarger, durationLesser, durationIsBetween } from '../_utils/TradeUtils';

const selectedAssetTicksSelector = state => {
    const selectedSymbol = state.fullTrade.get('symbol');
    const ticks = state.ticks.get(selectedSymbol).toJS();
    return {
        ticks,
    };
};

/*
const typeSelector = state => {
    const selectedSymbol = state.fullTrade.get('symbol');
    const tradingOptions = state.tradingOptions.get(selectedSymbol);
    const allTypes = tradingOptions.map(opt => ({ value: opt.contract_type, text: opt.contract_display }));
    return (new Set(allTypes)).toJS();
};*/
/*
const durationSelector = state => {
    const selectedSymbol = state.fullTrade.get('symbol');
    const tradingOptions = state.tradingOptions.get(selectedSymbol);    // assuming it's available
    const selectedType = state.fullTrade.get('type');
    const relatedTradingOptions = tradingOptions.filter(opt => opt.contract_type === selectedType);
    const mins = relatedTradingOptions.map(opt => opt.min_contract_duration);
    const maxs = relatedTradingOptions.map(opt => opt.max_contract_duration);

    const min = mins.reduce((a, b) => durationLesser(a, b) ? a : b);
    const max = maxs.reduce((a, b) => durationLarger(a, b) ? a : b);

    const selectedDuration = state.fullTrade.get('duration');
    return {
        min,
        max,
        duration: selectedDuration.slice(0, -1),
        unit: selectedDuration.slice(-1),
    };
};

// return an array, {} means no barrier required
const barriersSelector = state => {
    const selectedSymbol = state.fullTrade.get('symbol');
    const selectedType = state.fullTrade.get('type');
    const selectedDuration = state.fullTrade.get('duration');
    const tradingOptions = state.tradingOptions.get(selectedSymbol);
    const relatedTradingOptions = tradingOptions.filter(opt => {
        return opt.contract_type === selectedType &&
            durationIsBetween(selectedDuration, opt.min_contract_duration, opt.max_contract_duration);
    });
    const relatedTradingBarriers = relatedTradingOptions.map(opt => {
        if (opt.barriers === 1) {
            return [{
                name: 'Barrier',
                defaultValue: opt.barrier,
            }];
        }
        if (opt.barriers === 2) {
            return [{
                name: 'High Barrier',
                defaultValue: opt.high_barrier,
            }, {
                name: 'Low Barrier',
                defaultValue: opt.low_barrier,
            }];
        }

        return [];
    });

    return relatedTradingBarriers;
};*/

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
    const selectedSymbol = state.fullTrade.get('symbol');
    const selectedDuration = state.fullTrade.get('duration');       // eg. '5'
    const selectedDurationUnit = state.fullTrade.get('durationUnit');       // eg. 'h'
    const selectedCategory = state.fullTrade.get('tradeCategory');

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
                durationInfo: riseDurationInfo,
                barriersInfo: riseBarriersInfo,
            },
            {
                name: 'Fall',
                durationInfo: fallDurationInfo,
                barriersInfo: fallBarriersInfo,
            },
            {
                name: 'Higher',
                durationInfo: higherDurationInfo,
                barriersInfo: higherBarriersInfo,
            },
            {
                name: 'Lower',
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

const selectedAssetSelector = state => state.fullTrade.get('symbol');
const tradingTypeSelector = state => {
    const selected = state.fullTrade.get('tradeCategory');
    const selectedSymbol = state.fullTrade.get('symbol');
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
    const { basis, amount } = state.fullTrade.toJS();
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
