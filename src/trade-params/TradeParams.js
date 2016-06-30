import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import isIntraday from 'binary-utils/lib/isIntraday';
import askPriceFromProposal from 'binary-utils/lib/askPriceFromProposal';

import ErrorMsg from 'binary-components/lib/ErrorMsg';
import Modal from '../containers/Modal';
import PurchaseFailed from 'binary-components/lib/PurchaseFailed';
import BarrierCard from '../barrier-picker/BarrierCard';
// import SpreadBarrierCard from '../barrier-picker/SpreadBarrierCard';
import DigitBarrierCard from '../barrier-picker/DigitBarrierCard';
import DurationCard from '../duration-picker/DurationCard';
import ForwardStartingOptions from '../duration-picker/ForwardStartingOptions';
import StakeCard from '../payout-picker/StakeCard';
import PayoutCard from '../payout-picker/PayoutCard';
import TradeTypeDropDown from '../trade-type-picker/TradeTypeDropDown';
import AssetPickerDropDown from '../asset-picker/AssetPickerDropDown';
import BuyButton from './BuyButton';

import * as LiveData from '../_data/LiveData';
import { changeAsset, changeBarrier1, changeBarrier2, changeCategory, changeStartDate,
    changeDurationUnit, changeAmount, changeAmountPerPoint } from './TradeParamsCascadingUpdates';

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
 * 6. For underlying that's under our control, we allow relative and absolute barrier regardless of intraday or not
 * 7. Relative barrier is always allowed
 * 8. Forward starting do not have barriers
 * 9. All underlying have risefall trade
 *
 * possibly a better approach would be notify user for wrong info instead of change to correct value automatically,
 * default may not be a good idea at all as client might always want to input value
 */

const errorToShow = errorObj => {
    const { barrierError, durationError, proposalError, purchaseError } = errorObj;

    if (barrierError) return barrierError;
    if (durationError) return durationError;
    if (proposalError) return proposalError;
    if (purchaseError) return purchaseError;

    return undefined;
};

export default class TradeParams extends Component {

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        compact: PropTypes.bool,
        disabled: PropTypes.bool,
        errors: PropTypes.object,
        index: PropTypes.number.isRequired,
        onPurchaseHook: PropTypes.func,
        pipSize: PropTypes.number.isRequired,
        proposal: PropTypes.object,
        purchaseError: PropTypes.string,
        style: PropTypes.object,
        tradeParams: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            dynamicKey: 0,
        };
    }

    componentWillMount() {
        this.onAssetChange();
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    /**
     * componentDidUpdate is used instead of componentWillReceiveProps because the onAssetChange depends on updated
     * props, which only accessible after component update
     * it's a mistake here that method to be reuse are coupled with component states
     * TODO: redesign so that side effect are handle elsewhere
     */
    componentDidUpdate(prevProps) {
        const { tradeParams } = this.props;

        if (tradeParams.symbol !== prevProps.tradeParams.symbol) {
            const { proposal } = prevProps;
            if (proposal) {
                LiveData.api.unsubscribeByID(proposal.id);
            }
            this.onAssetChange();
        }
        windowResizeEvent();
    }

    componentWillUnmount() {
        const { proposal, errors } = this.props;
        if (errors.proposalError) {
            return;
        }
        if (proposal) {
            LiveData.api.unsubscribeByID(proposal.id);
        }
    }

    onAssetChange = () => {
        const { contract, tradeParams } = this.props;
        const updatedAsset = changeAsset(tradeParams, contract, changeCategory);
        this.updateTradeParams(updatedAsset);
        this.repaintSelf();
        this.clearTradeError();
    }

    onStartDateChange = epoch => {
        const { contract, tradeParams } = this.props;
        const updatedStartDate = changeStartDate(epoch, contract, tradeParams);
        this.updateTradeParams(updatedStartDate);
    }

    onDurationChange = e => {
        this.updateTradeParams({ duration: e.target.value });
    }

    onDurationUnitChange = e => {
        const newUnit = e.target.value;
        const { contract, tradeParams } = this.props;
        const updatedDurationUnit = changeDurationUnit(newUnit, contract, tradeParams);
        this.updateTradeParams(updatedDurationUnit);
    }

    onDurationError = err => {
        const { actions, index } = this.props;
        actions.updateTradeError(index, 'durationError', err);
    }

    onBarrier1Change = e => {
        const inputValue = e.target.value;
        const updatedBarrier1 = changeBarrier1(inputValue);
        this.updateTradeParams(updatedBarrier1);
    }

    onBarrier2Change = e => {
        const inputValue = e.target.value;
        const updatedBarrier2 = changeBarrier2(inputValue);
        this.updateTradeParams(updatedBarrier2);
    }

    onBarrierError = err => {
        const { actions, index } = this.props;
        actions.updateTradeError(index, 'barrierError', err);
    }

    onBasisChange = e => {
        this.updateTradeParams({ basis: e.target.value });
    }

    onAmountChange = e => {
        const inputValue = e.target.value;
        if (inputValue < 0) {
            const updatedAmount = changeAmount(1);
            this.updateTradeParams(updatedAmount);
        } else if (inputValue > 500) {                  // TODO: temporary to control stake amount
            if (this.props.tradeParams.amount === 500) return;
            const updatedAmount = changeAmount(500);
            this.updateTradeParams(updatedAmount);
        } else {
            const updatedAmount = changeAmount(inputValue);
            this.updateTradeParams(updatedAmount);
        }
    }

    onAmountPerPointChange = e => {
        const inputValue = e.target.value;
        const updatedAmountPerPoint = changeAmountPerPoint(inputValue);
        this.updateTradeParams(updatedAmountPerPoint);
    }

    onCloseModal = () => {
        const { actions, index } = this.props;
        actions.updateTradeError(index, 'purchaseError', undefined);
    }

    onStopTypeChange = e => {
        this.updateTradeParams({ stopType: e.target.value });
    }

    onStopLossChange = e => {
        this.updateTradeParams({ stopLoss: e.target.value });
    }

    onStopProfitChange = e => {
        this.updateTradeParams({ stopProfit: e.target.value });
    }

    onPurchase = () => {
        const { actions, index, onPurchaseHook } = this.props;
        actions.purchaseByTradeId(index).then(onPurchaseHook);
    }

    updateTradeParams = params => {
        const { actions, index } = this.props;
        actions.updateMultipleTradeParams(index, params);
        actions.updatePriceProposalSubscription(index);
    }

    // TODO: create an action that update all at once
    clearTradeError = () => {
        const { actions, index } = this.props;
        actions.updateTradeError(index, 'barrierError', undefined);
        actions.updateTradeError(index, 'durationError', undefined);
        actions.updateTradeError(index, 'proposalError', undefined);
        actions.updateTradeError(index, 'purchaseError', undefined);
    }

    repaintSelf = () => {
        const { dynamicKey } = this.state;
        this.setState({ dynamicKey: dynamicKey + 1 });
    }

    render() {
        const {
            contract,
            currency,
            disabled,
            errors,
            index,
            pipSize,
            proposal,
            style,
            tradeParams,
        } = this.props;

        /**
         * Race condition happen when contract is updated before tradeCategory (async)
         * thus we need to check if the tradeCategory is valid, if not valid simply use the 1st valid category
         */
        const selectedCategory = tradeParams.tradeCategory;
        const categoryToUse = !!contract[selectedCategory] ? selectedCategory : Object.keys(contract)[0];

        const selectedType = tradeParams.type;
        const contractForCategory = contract[categoryToUse];
        const contractForType = contractForCategory && contractForCategory[selectedType];
        const barriers = contractForType && contractForType.barriers;
        const isIntraDay = isIntraday(tradeParams.duration, tradeParams.durationUnit);
        const showBarrier = categoryToUse !== 'spreads' &&
            categoryToUse !== 'digits' &&
            !tradeParams.dateStart &&
            !!barriers;

        const payout = proposal && proposal.payout;

        const showDuration = !!contractForType;
        const showDigitBarrier = categoryToUse === 'digits';
        const showSpreadBarrier = categoryToUse === 'spreads';
        const askPrice = askPriceFromProposal(proposal);

        const errorText = errorToShow(errors);

        return (
            <div className="trade-params" disabled={disabled} key={this.state.dynamicKey} style={style}>
                <Modal shown={!!errors.purchaseError} onClose={this.onCloseModal}>
                    <PurchaseFailed failure={errors.purchaseError} />
                </Modal>
                <ErrorMsg text={contract.error || errorText} />
                <AssetPickerDropDown
                    {...this.props}
                    selectedSymbol={tradeParams.symbol}
                    selectedSymbolName={tradeParams.symbolName}
                />
                <TradeTypeDropDown
                    {...this.props}
                    updateParams={this.updateTradeParams}
                    clearTradeError={this.clearTradeError}
                />
                {showDigitBarrier &&
                    <DigitBarrierCard
                        barrier={+tradeParams.barrier}
                        barrierInfo={barriers && barriers.tick[0]}
                        index={index}
                        onBarrierChange={this.onBarrier1Change}
                    />
                }
                {/* showSpreadBarrier &&
                    <SpreadBarrierCard
                        amountPerPoint={tradeParams.amountPerPoint}
                        stopLoss={tradeParams.stopLoss}
                        stopProfit={tradeParams.stopProfit}
                        stopType={tradeParams.stopType}
                        amountPerPointChange={this.onAmountPerPointChange}
                        currency={currency}
                        index={index}
                        spreadInfo={contractForType.spread}
                        stopTypeChange={this.onStopTypeChange}
                        stopLossChange={this.onStopLossChange}
                        stopProfitChange={this.onStopProfitChange}
                    />
                */}
                {showBarrier &&
                    <BarrierCard
                        barrier={tradeParams.barrier}
                        barrier2={tradeParams.barrier2}
                        barrierInfo={barriers}
                        barrierType={tradeParams.barrierType}
                        isIntraDay={isIntraDay}
                        pipSize={pipSize}
                        onBarrier1Change={this.onBarrier1Change}
                        onBarrier2Change={this.onBarrier2Change}
                        spot={proposal && +proposal.spot}
                        onError={this.onBarrierError}
                    />
                }
                {showDuration && !showSpreadBarrier &&
                    <DurationCard
                        dateStart={tradeParams.dateStart}
                        duration={+tradeParams.duration}
                        durationUnit={tradeParams.durationUnit}
                        forwardStartingDuration={contractForType.forwardStartingDuration}
                        options={contractForType.durations}
                        onDurationChange={this.onDurationChange}
                        onUnitChange={this.onDurationUnitChange}
                        onError={this.onDurationError}
                        index={index}
                    />
                }
                {showDuration && !showSpreadBarrier && contractForType.forwardStartingDuration &&
                    <ForwardStartingOptions
                        dateStart={tradeParams.dateStart}
                        forwardStartingDuration={contractForType.forwardStartingDuration}
                        onStartDateChange={this.onStartDateChange}
                        options={contractForType.durations}
                        index={index}
                    />
                }
                {!showSpreadBarrier &&
                    <StakeCard
                        amount={+tradeParams.amount}
                        isVirtual={false}
                        onAmountChange={this.onAmountChange}
                        onBasisChange={this.onBasisChange}
                    />
                }
                <PayoutCard
                    stake={askPrice}
                    payout={+payout}
                    currency={currency}
                />
                <BuyButton
                    askPrice={askPrice}
                    currency={currency}
                    disabled={disabled}
                    longcode={proposal && proposal.longcode}
                    onClick={this.onPurchase}
                />
            </div>
        );
    }
}
