import React, { Component, PropTypes } from 'react';
import { SelectGroup, ErrorMsg, Modal, M, PurchaseConfirmation } from '../_common';
import RadioGroup from './workaround/CustomRadioGroup';
import { contractCategoryDisplay, durationToSecs } from '../_utils/TradeUtils';
import { tradeTypes } from '../_constants/TradeParams';
import BarrierCard from './BarrierCard';
import ContractStatsCard from './ContractStatsCard';
import DigitBarrierCard from './DigitBarrierCard';
import DurationCard from './DurationCard';
import PayoutCard from './PayoutCard';
import SpreadBarrierCard from './SpreadBarrierCard';
import MobileChart from '../charting/MobileChart';

/**
 * This UI is coded with a few assumptions, which should always be true, this comments serves as a future reference
 * purpose.
 *
 * 1. Tick trade will not have barrier, unless it's a digit trade, reason is that the duration is too short.
 * 2. Barriers value are interpreted differently depends on the duration input, if the contract span over 24 hours,
 *    the barrier(s) are interpreted as absolute value, otherwise it is interpreted as relative value, reason being
 *    that transaction happens for the next tick, to prevent some client having a faster feed, thus, having a better
 *    estimation for his bet, we do not allow betting on absolute value, this only apply to intraday contract, because
 *    the value of single tick diminish when contract time is long, we use intraday simply because it's easier for
 *    quants.
 * 3. ticks is always within 5 to 10
 * 4. digit trade is always ticks only
 * 5. barriers are non available for contract below 2 minutes
 */
const getTradeTypeText = type => {
    const name = tradeTypes.find(t => t.value === type).text;
    return name;
};

const createDefaultType = (contracts, category) => {
    return Object.keys(contracts[category])[0];
};

const createDefaultDuration = (contracts, category, type) => {
    if (category === 'spreads') {
        return [undefined, undefined];
    }
    const d = contracts[category][type].durations[0];
    return [d.min, d.unit];
};

const createDefaultBarriers = (contracts, category, type, duration, durationUnit) => {
    if (category === 'spreads') {
        return [];
    }

    let expiryType;
    if (durationUnit === 't') {
        expiryType = 'tick';
    } else if (durationToSecs(duration, durationUnit) <= 86400) {
        expiryType = 'intraday';
    } else {
        expiryType = 'daily';
    }

    // this is an observation, might not always true
    if (durationToSecs(duration, durationUnit) < 120) {
        return [undefined, undefined];
    }

    const barriers = contracts[category][type].barriers;
    if (!barriers) {
        return [undefined, undefined];
    }

    const barrierByExpiry = barriers[expiryType];
    if (category === 'digits') {
        return [barrierByExpiry && barrierByExpiry[0].defaultValue];
    }

    if (!barrierByExpiry) {
        // this expiry type have no barrier
        return [undefined, undefined];
    }

    if (barrierByExpiry.length === 1) {
        switch (expiryType) {
            case 'tick': {
                console.log('Should not have tick expiry');
                return [undefined, undefined];
            }
            case 'intraday': return [+barrierByExpiry[0].defaultValue];
            case 'daily': return [+barrierByExpiry[0].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    if (barrierByExpiry.length === 2) {
        switch (expiryType) {
            case 'tick': {
                console.log('Should not have tick expiry');
                return [undefined, undefined];
            }
            case 'intraday': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            case 'daily': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    throw new Error('default barrier creation failed');
};

export default class TradePanel extends Component {
    constructor(props) {
        super(props);
        this.updateHelper = ::this.updateHelper;
        this.onAssetChange = ::this.onAssetChange;
        this.onCategoryChange = ::this.onCategoryChange;
        this.onTypeChange = ::this.onTypeChange;
        this.onDurationChange = ::this.onDurationChange;
        this.onDurationUnitChange = ::this.onDurationUnitChange;
        this.onBarrier1Change = ::this.onBarrier1Change;
        this.onBarrier2Change = ::this.onBarrier2Change;
        this.onBarrierTypeChange = ::this.onBarrierTypeChange;
        this.onBasisChange = ::this.onBasisChange;
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onAmountPerPointChange = ::this.onAmountPerPointChange;
        this.onStopLossChange = ::this.onStopLossChange;
        this.onStopTypeChange = ::this.onStopTypeChange;
        this.onStopProfitChange = ::this.onStopProfitChange;
        this.onPurchase = ::this.onPurchase;
        this.onClosePanel = ::this.onClosePanel;
    }

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        id: PropTypes.string.isRequired,
        trade: PropTypes.object.isRequired,
        tick: PropTypes.array,
    };

    componentWillMount() {
        const { actions, id } = this.props;
        this.onCategoryChange({ target: { value: 'callput' } }, false);
        actions.updatePriceProposalSubscription(id);
    }

    updateHelper(name, value, update = true) {
        const { actions, id } = this.props;
        actions.updateTradeParams(id, name, value);
        if (update) {
            actions.updatePriceProposalSubscription(id);
        }
    }

    onAssetChange(e) {
        this.updateHelper('symbol', e.target.value);
        const { actions } = this.props;
        actions.getTradingOptions(e.target.value);
        actions.getTicksBySymbol(e.target.value);
        this.onCategoryChange({ target: { value: 'callput' } }, false);
    }

    // scary but necessary as all fields have dependency on category
    onCategoryChange(e, update = false) {
        const newCategory = e.target.value;
        this.updateHelper('tradeCategory', newCategory, update);

        const { contract, tick } = this.props;
        const defaultType = createDefaultType(contract, newCategory);
        const lastSpot = tick ? tick[tick.length - 1].quote : 0;

        // update type
        this.updateHelper('type', defaultType, false);

        // update duration
        const newDuration = createDefaultDuration(contract, newCategory, defaultType);
        this.updateHelper('duration', newDuration[0], false);
        this.updateHelper('durationUnit', newDuration[1], false);

        const newBarrier = createDefaultBarriers(
            contract,
            newCategory,
            defaultType,
            newDuration[0],
            newDuration[1],
            lastSpot);

        this.updateHelper('barrier', newBarrier[0], false);
        this.updateHelper('barrier2', newBarrier[1], false);

        // spread is different from all other type
        if (newCategory === 'spreads') {
            const spread = contract[newCategory][defaultType].spread;
            this.updateHelper('amountPerPoint', spread.amountPerPoint, false);
            this.updateHelper('stopType', spread.stopType, false);
            this.updateHelper('stopLoss', spread.stopLoss, false);
            this.updateHelper('stopProfit', spread.stopProfit, false);
        } else {
            this.updateHelper('amountPerPoint', undefined, false);
            this.updateHelper('stopType', undefined, false);
            this.updateHelper('stopLoss', undefined, false);
            this.updateHelper('stopProfit', undefined, false);
        }

        const { actions, id } = this.props;
        actions.updatePriceProposalSubscription(id);
    }

    onTypeChange(e) {
        const type = e.target.value;
        this.updateHelper('type', type, false);

        const { contract, trade, tick } = this.props;
        const category = trade.tradeCategory;
        const lastSpot = tick ? tick[tick.length - 1].quote : 0;
        const newDuration = createDefaultDuration(contract, category, type);
        const newBarrier = createDefaultBarriers(contract, category, type, newDuration[0], newDuration[1], lastSpot);

        this.updateHelper('duration', newDuration[0], false);
        this.updateHelper('durationUnit', newDuration[1], false);
        this.updateHelper('barrier', newBarrier[0], false);
        this.updateHelper('barrier2', newBarrier[1], true);
    }

    onDurationChange(e) {
        this.updateHelper('duration', e.target.value);
    }

    onDurationUnitChange(e) {
        const newUnit = e.target.value;
        this.updateHelper('durationUnit', newUnit, false);

        const { contract, trade, tick } = this.props;
        const { tradeCategory, type, duration } = trade;
        const lastSpot = tick ? tick[tick.length - 1].quote : 0;
        const newBarrier = createDefaultBarriers(contract, tradeCategory, type, duration, newUnit, lastSpot);

        this.updateHelper('barrier', newBarrier[0], false);
        this.updateHelper('barrier2', newBarrier[1], true);
    }

    onBarrier1Change(e) {
        this.updateHelper('barrier', +e.target.value);
    }

    onBarrier2Change(e) {
        this.updateHelper('barrier2', +e.target.value);
    }

    onBarrierTypeChange(type) {
        const { tick, trade } = this.props;
        const lastSpot = tick ? tick[tick.length - 1].quote : 0;

        if (type === 'relative') {
            if (trade.barrier) {
                this.updateHelper('barrier', trade.barrier - lastSpot, false);
            }
            if (trade.barrier2) {
                this.updateHelper('barrier2', trade.barrier2 - lastSpot, false);
            }
        }

        if (type === 'absolute') {
            if (trade.barrier) {
                this.updateHelper('barrier', trade.barrier + lastSpot, false);
            }
            if (trade.barrier2) {
                this.updateHelper('barrier2', trade.barrier2 + lastSpot, false);
            }
        }

        this.updateHelper('barrierType', type);
    }

    onBasisChange(e) {
        this.updateHelper('basis', e.target.value);
    }

    onAmountChange(e) {
        this.updateHelper('amount', +e.target.value);
    }

    onAmountPerPointChange(e) {
        this.updateHelper('amountPerPoint', +e.target.value);
    }

    onStopTypeChange(e) {
        this.updateHelper('stopType', e.target.value);
    }

    onStopLossChange(e) {
        this.updateHelper('stopLoss', e.target.value);
    }

    onStopProfitChange(e) {
        this.updateHelper('stopProfit', e.target.value);
    }

    onPurchase() {
        const { actions, id } = this.props;
        actions.purchaseByTradeID(id);
    }

    onClosePanel() {
        const { actions, id } = this.props;
        actions.destroyTrade(id);
    }

    render() {
        const { assets, contract, id, trade, currency, tick } = this.props;
        const selectedSymbol = trade.symbol;
        const categories = Object.keys(contract).map(c => ({ value: c, text: contractCategoryDisplay(c) }));
        const selectedCategory = trade.tradeCategory;
        const types = Object
            .keys(contract[selectedCategory])
            .map(type => ({ text: getTradeTypeText(type), value: type }));
        const selectedType = trade.type;
        const contractForType = contract[selectedCategory][selectedType];
        const barriers = contractForType && contractForType.barriers;
        const receipt = trade.receipt;
        const isTick = trade.durationUnit && trade.durationUnit.slice(-1) === 't';
        const isBelow2Min = isTick || durationToSecs(trade.duration, trade.durationUnit) < 120;
        const isIntraDay = durationToSecs(trade.duration, trade.durationUnit) <= 86400;
        const lastSpot = tick ? tick[tick.length - 1].quote : 0;

        return (
            <div>
                <button onClick={this.onClosePanel}>
                    <M m="Close" />
                </button>
                <MobileChart
                    className="trade-chart"
                    history={tick}
                    showBarrier={!!barriers}
                    spot={lastSpot}
                />
                <div className="row">
                    <SelectGroup
                        optgroups={assets}
                        value={selectedSymbol}
                        onChange={this.onAssetChange}
                    />
                    <SelectGroup
                        options={categories}
                        value={selectedCategory}
                        onChange={this.onCategoryChange}
                    />
                </div>
                <Modal shown={!!receipt} onClose={() => this.updateHelper('receipt', undefined)} >
                    <PurchaseConfirmation receipt={receipt} />
                </Modal>
                { contractForType &&
                    <div>
                        <RadioGroup
                            name={'trading-types' + id}
                            options={types}
                            value={selectedType}
                            onChange={this.onTypeChange}
                        />
                        <DurationCard
                            duration={+trade.duration}
                            durationUnit={trade.durationUnit}
                            forwardStartingDuration={contractForType.forwardStartingDuration}
                            options={contractForType.durations}
                            onDurationChange={this.onDurationChange}
                            onUnitChange={this.onDurationUnitChange}
                        />
                        {selectedCategory === 'digits' &&
                            <DigitBarrierCard
                                barrier={trade.barrier}
                                barrierInfo={barriers && barriers.tick[0]}
                                id={id}
                                onBarrierChange={this.onBarrier1Change}
                            />}
                        {selectedCategory === 'spreads' &&
                        <SpreadBarrierCard
                            amountPerPointChange={this.onAmountPerPointChange}
                            currency={currency}
                            id={id}
                            spreadInfo={contractForType.spread}
                            stopTypeChange={this.onStopTypeChange}
                            stopLossChange={this.onStopLossChange}
                            stopProfitChange={this.onStopProfitChange}
                        />}
                        {(selectedCategory !== 'spreads' && selectedCategory !== 'digits' && !isBelow2Min) &&
                            <BarrierCard
                                barrier={trade.barrier}
                                barrier2={trade.barrier2}
                                barrierInfo={barriers}
                                barrierType={trade.barrierType}
                                isIntraDay={isIntraDay}
                                onBarrier1Change={this.onBarrier1Change}
                                onBarrier2Change={this.onBarrier2Change}
                                onBarrierTypeChange={this.onBarrierTypeChange}
                                spot={trade.proposal && +trade.proposal.spot}
                            />}
                    </div>
                }
                <PayoutCard
                    amount={+trade.amount}
                    basis={trade.basis}
                    currency="USD"
                    id={id}
                    onAmountChange={this.onAmountChange}
                    onBasisChange={this.onBasisChange}
                />
                {trade.proposal &&
                <ContractStatsCard proposal={trade.proposal} spread={selectedCategory === 'spreads'} />}
                <ErrorMsg shown={!!trade.proposalError} text={trade.proposalError ? trade.proposalError.message : ''} />
                <button onClick={this.onPurchase}>
                    <M m="Purchase" />
                </button>
            </div>
        );
    }
}
