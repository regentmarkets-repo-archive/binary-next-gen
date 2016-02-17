import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import M from '../_common/M';
import ErrorMsg from '../_common/ErrorMsg';
import SelectGroup from '../_common/SelectGroup';
import PurchaseFailed from '../_common/PurchaseFailed';
import PurchaseConfirmation from '../_common/PurchaseConfirmation';
import Modal from '../containers/Modal';
import RadioGroup from './workaround/CustomRadioGroup';
import { contractCategoryDisplay, durationToSecs, isIntraday } from '../_utils/TradeUtils';
import BarrierCard from './barriers/BarrierCard';
import DigitBarrierCard from './barriers/DigitBarrierCard';
import DurationCard from '../duration-picker/DurationCard';
import PayoutCard from '../payout-picker/PayoutCard';
import SpreadBarrierCard from './barriers/SpreadBarrierCard';
import MobileChart from '../charting/MobileChart';
import BuyButton from '../tick-trade/BuyButton';
import { askPriceFromProposal, tradeTypeCodeToText } from '../_utils/TradeUtils';

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
 * 6. forward starting does not have barriers
 */
const createDefaultType = (contracts, category) =>
    Object.keys(contracts[category])[0];

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
    } else if (isIntraday(duration, durationUnit)) {
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
                // console.log('Should not have tick expiry');
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
                // console.log('Should not have tick expiry');
                return [undefined, undefined];
            }
            case 'intraday': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            case 'daily': return [+barrierByExpiry[0].defaultValue, +barrierByExpiry[1].defaultValue];
            default: throw new Error('unknown expiry');
        }
    }

    throw new Error('default barrier creation failed');
};

const durationIsWithinRange = (duration, durationUnit, range) => {
    const relatedBlock = range.find(r => r.unit === durationUnit);
    if (!relatedBlock) {
        return false;
    }

    return duration <= relatedBlock.max && duration >= relatedBlock.min;
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
        this.onStartDateChange = ::this.onStartDateChange;
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

    shouldComponentUpdate = shouldPureComponentUpdate;

    componentWillMount() {
        this.onCategoryChange({ target: { value: 'callput' } }, false);
    }

    componentWillReceiveProps(nextProps) {
        const proposal = nextProps.trade.proposal;
        if (proposal && proposal === this.props.trade.proposal) {
            return;
        }
        // if no realtime feed, dont provide options to change between relative and absolute
        if (!proposal || !proposal.spot) {
            const isIntraDay = isIntraday(nextProps.trade.duration, nextProps.trade.durationUnit);
            const newBarrierType = isIntraDay ? 'relative' : 'absolute';
            if (nextProps.trade.barrierType !== newBarrierType) {
                this.updateHelper('barrierType', newBarrierType);
            }
        }
    }

    updateHelper(name, value, update = true) {
        const { actions, id } = this.props;
        actions.updateTradeParams(id, name, value);
        if (update) {
            actions.updatePriceProposalSubscription(id);
        }
    }

    onAssetChange(e) {
        const { id, actions } = this.props;
        const symbol = e.target.value;
        actions.updateTradeParams(id, 'disabled', true);
        actions.getTradingOptions(symbol, () => {
            this.updateHelper('symbol', symbol);
            this.onCategoryChange({ target: { value: 'callput' } }, false);
            actions.updateTradeParams(id, 'disabled', false);
        });
        actions.getTicksBySymbol(symbol);
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
        this.updateHelper('dateStart', undefined, false);

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
        this.updateHelper('dateStart', undefined, false);
        this.updateHelper('barrier', newBarrier[0], false);
        this.updateHelper('barrier2', newBarrier[1], true);
    }

    onStartDateChange(epoch) {
        const { contract, trade } = this.props;
        const { duration, durationUnit, tradeCategory, type } = trade;
        const newDurations = contract[tradeCategory][type].forwardStartingDuration.options;

        // do not reset duration unless the old one is not valid
        if (!epoch || durationIsWithinRange(duration, durationUnit, newDurations)) {
            this.updateHelper('dateStart', epoch);
            return;
        }

        this.updateHelper('dateStart', epoch, false);
        this.updateHelper('duration', newDurations[0].min, false);
        this.updateHelper('durationUnit', newDurations[0].unit, false);
        this.updateHelper('barrier', undefined, false);
        this.updateHelper('barrier2', undefined, true);
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

        // if it's forward starting type, do not update barrier as not applicable
        if (!trade.dateStart) {
            this.updateHelper('barrier', newBarrier[0], false);
            this.updateHelper('barrier2', newBarrier[1], false);
        }

        const { actions, id } = this.props;
        actions.updatePriceProposalSubscription(id);
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
        actions.purchaseByTradeId(id);
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
            .map(type => ({ text: tradeTypeCodeToText(type), value: type }));
        const selectedType = trade.type;
        const contractForType = contract[selectedCategory][selectedType];
        const barriers = contractForType && contractForType.barriers;
        const receipt = trade.receipt;
        const isTick = trade.durationUnit && trade.durationUnit.slice(-1) === 't';
        const isBelow2Min = isTick || durationToSecs(trade.duration, trade.durationUnit) < 120;
        const isIntraDay = isIntraday(trade.duration, trade.durationUnit);
        const lastSpot = tick ? tick[tick.length - 1].quote : 0;
        const disabled = trade.disabled;
        const pipSize = trade.pipSize;

        return (
            <fieldset disabled={disabled} className="trade-panel">
                <Modal shown={!!receipt} onClose={() => this.updateHelper('receipt', undefined)} >
                    <PurchaseConfirmation receipt={receipt} />
                </Modal>
                <Modal shown={!!trade.buy_error} onClose={() => this.updateHelper('buy_error', undefined)}>
                    <PurchaseFailed failure={trade.buy_error} />
                </Modal>
                <button className="btn-secondary" onClick={!disabled && this.onClosePanel}>
                    <M m="X" />
                </button>
                {tick && <MobileChart
                    className="trade-chart"
                    history={tick}
                    showBarrier={!!barriers}
                    spot={lastSpot}
                />}
                <div className="row">
                    <SelectGroup
                        id="assets-select"
                        optgroups={assets}
                        value={selectedSymbol}
                        onChange={this.onAssetChange}
                    />
                    <SelectGroup
                        id="categories-select"
                        options={categories}
                        value={selectedCategory}
                        onChange={this.onCategoryChange}
                    />
                </div>
                { contractForType &&
                    <div>
                        <RadioGroup
                            name={'trading-types' + id}
                            options={types}
                            value={selectedType}
                            onChange={this.onTypeChange}
                        />
                        <DurationCard
                            dateStart={trade.dateStart}
                            duration={+trade.duration}
                            durationUnit={trade.durationUnit}
                            forwardStartingDuration={contractForType.forwardStartingDuration}
                            options={contractForType.durations}
                            onDurationChange={this.onDurationChange}
                            onUnitChange={this.onDurationUnitChange}
                            onStartDateChange={this.onStartDateChange}
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
                        {(selectedCategory !== 'spreads' &&
                            selectedCategory !== 'digits' &&
                            !isBelow2Min &&
                            !trade.dateStart
                        ) &&
                            <BarrierCard
                                barrier={trade.barrier}
                                barrier2={trade.barrier2}
                                barrierInfo={barriers}
                                barrierType={trade.barrierType}
                                isIntraDay={isIntraDay}
                                pipSize={pipSize}
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
                <ErrorMsg shown={!!trade.proposalError} text={trade.proposalError ? trade.proposalError.message : ''} />
                <BuyButton
                    askPrice={askPriceFromProposal(trade.proposal)}
                    currency={currency}
                    disabled={disabled}
                    onClick={::this.onPurchase}
                />
            </fieldset>
        );
    }
}
