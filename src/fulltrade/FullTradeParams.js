import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import ErrorMsg from '../_common/ErrorMsg';
import { isIntraday, isDurationLessThan2Mins, getLastTick } from '../_utils/TradeUtils';
import BarrierCard from '../barrier-picker/BarrierCard';
import DigitBarrierCard from '../barrier-picker/DigitBarrierCard';
import DurationCard from '../duration-picker/DurationCard';
import PayoutCard from '../payout-picker/PayoutCard';
import SpreadBarrierCard from '../barrier-picker/SpreadBarrierCard';
import { isDurationWithinRange } from '../_utils/DurationUtils';
import TradeTypePicker from './TradeTypePicker';
import { createDefaultType, createDefaultDuration, createDefaultBarriers } from './DefaultTradeParams';

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

export default class FullTradeParams extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        disabled: PropTypes.bool,
        index: PropTypes.number.isRequired,
        trade: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
    };

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
    }

    componentWillMount() {
        this.onCategoryChange('callput');
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

    updateTradeParams(params) {
        const { actions, index } = this.props;
        actions.updateMultipleTradeParams(index, params);
        actions.updatePriceProposalSubscription(index); // TODO: auto do that with multi trade params
    }

    updateHelper(name, value, update = true) {
        const { actions, index } = this.props;
        actions.updateTradeParams(index, name, value);
        if (update) {
            actions.updatePriceProposalSubscription(index);
        }
    }

    onAssetChange(e) {
        const { index, actions } = this.props;
        const symbol = e.target.value;
        actions.updateTradeParams(index, 'disabled', true);
        actions.getTradingOptions(symbol, () => {
            this.updateHelper('symbol', symbol);
            this.onCategoryChange('callput');
            actions.updateTradeParams(index, 'disabled', false);
        });
        actions.getTicksBySymbol(symbol);
    }

    // scary but necessary as all fields have dependency on category
    onCategoryChange(newCategory) {
        const { actions, contract, index, ticks } = this.props;

        const defaultType = createDefaultType(contract, newCategory);
        const lastSpot = getLastTick(ticks);

        const newDuration = createDefaultDuration(contract, newCategory, defaultType);
        const newBarrier = createDefaultBarriers(
            contract,
            newCategory,
            defaultType,
            newDuration[0],
            newDuration[1],
            lastSpot
        );

        actions.updateMultipleTradeParams(index, {
            tradeCategory: newCategory,
            type: defaultType,
            duration: newDuration[0],
            durationUnit: newDuration[1],
            dateStart: undefined,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
            amountPerPoint: undefined,
            stopType: undefined,
            stopLoss: undefined,
            stopProfit: undefined,
        });

        // spread is different from all other type
        // TODO: fix next
        // if (newCategory === 'spreads') {
        //     const spread = contract[newCategory][defaultType].spread;
        //     this.updateHelper('amountPerPoint', spread.amountPerPoint, false);
        //     this.updateHelper('stopType', spread.stopType, false);
        //     this.updateHelper('stopLoss', spread.stopLoss, false);
        //     this.updateHelper('stopProfit', spread.stopProfit, false);
        // }

        actions.updatePriceProposalSubscription(index);
    }

    onTypeChange(newType) {
        const { actions, index, contract, trade, ticks } = this.props;

        const category = trade.tradeCategory;
        const lastSpot = getLastTick(ticks);
        const newDuration = createDefaultDuration(contract, category, newType);
        const newBarrier = createDefaultBarriers(contract, category, newType, newDuration[0], newDuration[1], lastSpot);

        actions.updateMultipleTradeParams(index, {
            type: newType,
            duration: newDuration[0],
            durationUnit: newDuration[1],
            dateStart: undefined,
            barrier: newBarrier[0],
            barrier2: newBarrier[1],
        });
        actions.updatePriceProposalSubscription(index);
    }

    onStartDateChange(epoch) {
        const { actions, contract, index, trade } = this.props;
        const { duration, durationUnit, tradeCategory, type } = trade;
        const newDurations = contract[tradeCategory][type].forwardStartingDuration.options;

        // do not reset duration unless the old one is not valid
        if (!epoch || isDurationWithinRange(duration, durationUnit, newDurations)) {
            actions.updateMultipleTradeParams(index, { dateStart: epoch });
        } else {
            actions.updateMultipleTradeParams(index, {
                dateStart: epoch,
                duration: newDurations[0].min,
                durationUnit: newDurations[0].unit,
                barrier: undefined,
                barrier2: undefined,
            });
        }
        actions.updatePriceProposalSubscription(index);
    }

    onDurationChange(e) {
        this.updateHelper('duration', e.target.value);
    }

    onDurationUnitChange(e) {
        const newUnit = e.target.value;
        this.updateHelper('durationUnit', newUnit, false);

        const { contract, trade, ticks } = this.props;
        const { tradeCategory, type, duration } = trade;
        const lastSpot = getLastTick(ticks);
        const newBarrier = createDefaultBarriers(contract, tradeCategory, type, duration, newUnit, lastSpot);

        // if it's forward starting type, do not update barrier as not applicable
        if (!trade.dateStart) {
            this.updateHelper('barrier', newBarrier[0], false);
            this.updateHelper('barrier2', newBarrier[1], false);
        }

        const { actions, index } = this.props;
        actions.updatePriceProposalSubscription(index);
    }

    onBarrier1Change(e) {
        this.updateHelper('barrier', +e.target.value);
    }

    onBarrier2Change(e) {
        this.updateHelper('barrier2', +e.target.value);
    }

    onBarrierTypeChange(type) {
        const { ticks, trade } = this.props;
        const lastSpot = getLastTick(ticks);

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
        const properAmount = (+e.target.value).toFixed(2);          // avoid js floating point error
        this.updateHelper('amount', properAmount);
    }

    onAmountPerPointChange(e) {
        const properAmountPerPoint = (+e.target.value).toFixed(2);
        this.updateHelper('amountPerPoint', properAmountPerPoint);
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
        const { actions, index } = this.props;
        actions.purchaseByTradeId(index);
    }

    render() {
        const { actions, contract, disabled, index, trade, currency } = this.props;

        const selectedCategory = trade.tradeCategory;
        const selectedType = trade.type;
        const contractForType = contract[selectedCategory][selectedType];
        const barriers = contractForType && contractForType.barriers;
        const isBelow2Min = isDurationLessThan2Mins(trade.duration, trade.durationUnit);
        const isIntraDay = isIntraday(trade.duration, trade.durationUnit);
        const pipSize = trade.pipSize;
        const showBarrier = selectedCategory !== 'spreads' &&
            selectedCategory !== 'digits' &&
            !isBelow2Min &&
            !trade.dateStart;

        const showDuration = !!contractForType;
        const showDigitBarrier = selectedCategory === 'digits';
        const showSpreadBarrier = selectedCategory === 'spreads';

        return (
            <div disabled={disabled}>
                <TradeTypePicker
                    actions={actions}
                    contract={contract}
                    selectedCategory={selectedCategory}
                    selectedType={selectedType}
                    onCategoryChange={this.onCategoryChange}
                    onTypeChange={this.onTypeChange}
                />
                {showDuration &&
                    <DurationCard
                        dateStart={trade.dateStart}
                        duration={+trade.duration}
                        durationUnit={trade.durationUnit}
                        forwardStartingDuration={contractForType.forwardStartingDuration}
                        options={contractForType.durations}
                        onDurationChange={this.onDurationChange}
                        onUnitChange={this.onDurationUnitChange}
                        onStartDateChange={this.onStartDateChange}
                        startLater={trade.startLater}
                    />
                }
                {showDigitBarrier &&
                    <DigitBarrierCard
                        barrier={trade.barrier}
                        barrierInfo={barriers && barriers.tick[0]}
                        index={index}
                        onBarrierChange={this.onBarrier1Change}
                    />
                }
                {showSpreadBarrier &&
                    <SpreadBarrierCard
                        amountPerPointChange={this.onAmountPerPointChange}
                        currency={currency}
                        index={index}
                        spreadInfo={contractForType.spread}
                        stopTypeChange={this.onStopTypeChange}
                        stopLossChange={this.onStopLossChange}
                        stopProfitChange={this.onStopProfitChange}
                    />
                }
                {showBarrier &&
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
                        />
                }
                <PayoutCard
                    amount={+trade.amount}
                    basis={trade.basis}
                    currency={currency}
                    id={index}
                    onAmountChange={this.onAmountChange}
                    onBasisChange={this.onBasisChange}
                />
                <ErrorMsg
                    shown={!!trade.proposalError}
                    text={trade.proposalError ? trade.proposalError.message : ''}
                />
            </div>
        );
    }
}
