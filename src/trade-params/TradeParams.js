import React, { PureComponent, PropTypes } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import isMobile from 'binary-utils/lib/isMobile';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import isIntraday from 'binary-utils/lib/isIntraday';
import askPriceFromProposal from 'binary-utils/lib/askPriceFromProposal';

import ErrorMsg from 'binary-components/lib/ErrorMsg';
import Modal from '../containers/Modal';
import PurchaseFailed from 'binary-components/lib/PurchaseFailed';
import { actions } from '../_store';
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
import { changeAsset, changeCategory } from './TradeParamsCascadingUpdates';

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
    const { barrierError, contractError, durationError, proposalError, purchaseError, stakeError } = errorObj;

    if (contractError) return contractError;
    if (barrierError) return barrierError;
    if (durationError) return durationError;
    if (stakeError) return stakeError;
    if (proposalError) return proposalError;
    return purchaseError;
};

export const debounceForMobileAndWeb = func => debounce(func, 300, { leading: true, trailing: true });

export default class TradeParams extends PureComponent {

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
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

    onCloseModal = () => {
        const { index } = this.props;
        actions.updateTradeError(index, 'purchaseError', undefined);
    }

    onPurchase = () => {
        const { index, onPurchaseHook } = this.props;
        actions.purchaseByTradeId(index).then(onPurchaseHook);
    }

    throttledProposalSubscription =
        throttle(index => actions.updatePriceProposalSubscription(index), isMobile ? 500 : 300);

    updateTradeParams = params => {
        const { index } = this.props;
        actions.updateMultipleTradeParams(index, params);
        this.throttledProposalSubscription(index);
    }

    // TODO: create an action that update all at once
    clearTradeError = () => {
        const { index } = this.props;
        actions.updateTradeError(index, 'barrierError', undefined);
        actions.updateTradeError(index, 'durationError', undefined);
        actions.updateTradeError(index, 'proposalError', undefined);
        actions.updateTradeError(index, 'stakeError', undefined);
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
            <div className="trade-params" key={this.state.dynamicKey} style={style}>
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
                    forceTradeCardUpdate={this.repaintSelf}
                    clearTradeError={this.clearTradeError}
                />
                {showDigitBarrier &&
                    <DigitBarrierCard
                        barrier={+tradeParams.barrier}
                        barrierInfo={barriers && barriers.tick[0]}
                        index={index}
                        onUpdateTradeParams={this.updateTradeParams}
                    />
                }
                {/* showSpreadBarrier &&
                    <SpreadBarrierCard
                        amountPerPoint={tradeParams.amountPerPoint}
                        stopLoss={tradeParams.stopLoss}
                        stopProfit={tradeParams.stopProfit}
                        stopType={tradeParams.stopType}
                        currency={currency}
                        index={index}
                        spreadInfo={contractForType.spread}
                        onUpdateTradeParams={this.updateTradeParams}
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
                        spot={proposal && +proposal.spot}
                        onUpdateTradeParams={this.updateTradeParams}
                    />
                }
                {showDuration && !showSpreadBarrier &&
                    <DurationCard
                        dateStart={tradeParams.dateStart}
                        duration={+tradeParams.duration}
                        durationUnit={tradeParams.durationUnit}
                        forwardStartingDuration={contractForType.forwardStartingDuration}
                        options={contractForType.durations}
                        index={index}
                        onUpdateTradeParams={this.updateTradeParams}
                        forceTradeCardUpdate={this.repaintSelf}
                        contract={contract}
                        tradeParams={tradeParams}
                    />
                }
                {showDuration && !showSpreadBarrier && contractForType.forwardStartingDuration &&
                    <ForwardStartingOptions
                        dateStart={tradeParams.dateStart}
                        forwardStartingDuration={contractForType.forwardStartingDuration}
                        options={contractForType.durations}
                        index={index}
                        contract={contract}
                        tradeParams={tradeParams}
                        onUpdateTradeParams={this.updateTradeParams}
                    />
                }
                {!showSpreadBarrier &&
                    <StakeCard
                        amount={+tradeParams.amount}
                        isVirtual={false}
                        onUpdateTradeParams={this.updateTradeParams}
                        index={index}
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
