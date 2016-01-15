import { createSelector } from 'reselect';
import { Set } from 'immutable';
import { durationIsBetween, durationToSecs } from '../_utils/TradeUtils';
import { durationUnits } from '../_constants/TradeParams';
// import { durationLarger, durationLesser, durationIsBetween, durationTypes } from '../_utils/TradeUtils';

const selectedAssetTicksSelector = state => {
    const fullTrade = state.trade.get('1').toJS();      // hardcoded 1 as fulltrade
    const selectedSymbol = fullTrade.symbol;

    if (!state.ticks.get(selectedSymbol)) {
        return {
            ticks: [],
        };
    }

    const ticks = state.ticks.get(selectedSymbol).toJS();
    return {
        ticks,
    };
};

const durationInfo = (opts, duration, durationUnit) => {
    const allUnits = [].concat
        .apply([], opts.map(opt => [opt.min_contract_duration.slice(-1), opt.max_contract_duration.slice(-1)]));

    const minUnit = allUnits.reduce((a, b) => durationUnits.indexOf(a) < durationUnits.indexOf(b) ? a : b);
    const maxUnit = allUnits.reduce((a, b) => durationUnits.indexOf(a) > durationUnits.indexOf(b) ? a : b);
    const minIdx = durationUnits.indexOf(minUnit);
    const maxIdx = durationUnits.indexOf(maxUnit);
    const unitOptions = durationUnits.slice(minIdx, maxIdx + 1);

    if (durationUnit === 't') {
        return {
            durationUnit,
            duration,
            min: 5,
            max: 10,
            unitOptions,
        };
    }

    const selectedDurationMinSec = durationToSecs(1, durationUnit);
    const minSecs = opts
        .filter(opt => opt.min_contract_duration.indexOf('t') === -1)
        .map(opt => durationToSecs(opt.min_contract_duration.slice(0, -1), opt.min_contract_duration.slice(-1)))
        .filter(s => s >= selectedDurationMinSec);
    const maxSecs = opts
        .filter(opt => opt.max_contract_duration.indexOf('t') === -1)
        .map(opt => durationToSecs(opt.max_contract_duration.slice(0, -1), opt.max_contract_duration.slice(-1)))
        .filter(s => s >= selectedDurationMinSec);

    const minSec = minSecs.reduce((a, b) => Math.min(a, b));
    const maxSec = maxSecs.reduce((a, b) => Math.max(a, b));

    let min;
    let max;
    switch (durationUnit) {
        case 's': {
            min = minSec;
            max = maxSec;
            break;
        }
        case 'm': {
            min = Math.floor(minSec / 60);
            max = Math.floor(maxSec / 60);
            break;
        }
        case 'h': {
            min = Math.floor(minSec / 3600);
            max = Math.floor(maxSec / 3600);
            break;
        }
        case 'd': {
            min = Math.floor(minSec / 86400);
            max = Math.floor(maxSec / 86400);
            break;
        }
        default: throw new Error('Unknown duration unit: ' + durationUnit);
    }

    return {
        durationUnit,
        duration,
        min,
        max,
        unitOptions,
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

    if (!tradingOptions) {
        return [];      // data not received yet
    }

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
            name: opts[0].contract_display,
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
    const selectedCategory = fullTrade.tradeCategory;
    const selectedType = fullTrade.type;
    const selectedSymbol = fullTrade.symbol;
    const relevantOptions = state.tradingOptions.get(selectedSymbol);

    if (!relevantOptions) {
        return {
            allCategories: [],
            selectedType,
        };
    }

    const tempObj = {};
    relevantOptions.forEach(opt => { tempObj[opt.contract_category] = opt.contract_category_display; });

    const categories = Object.keys(tempObj).map(k => ({ text: tempObj[k], value: k }));
    return {
        allCategories: categories,
        selectedCategory,
        selectedType,
    };
};

const payoutSelector = state => {
    const { basis, amount } = state.trade.get('1').toJS();
    const currency = state.account.get('currency');

    return {
        basis,
        amount,
        currency,
    };
};

const proposalSelector = state => {
    const allProposals = state.proposals.toJS();
    const { priceProposalID } = state.trade.get('1').toJS();
    return priceProposalID ? allProposals[priceProposalID] : undefined;
};

export const fullTradeSelector = createSelector(
    selectedAssetSelector,
    tradingTypeSelector,
    selectedAssetTicksSelector,
    contractsSelector,
    payoutSelector,
    availableAssetsSelector,
    proposalSelector,
    (selectedAsset, tradingTypeInfo, ticksInfo, contractOptions, payoutInfo, availableAssets, proposal) => ({
        selectedAsset,
        ticksInfo,
        contractOptions,
        tradingTypeInfo,
        payoutInfo,
        id: '1',
        availableAssets,
        proposal,
    })
);
