import React, { PureComponent, PropTypes } from 'react';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { isMobile, isIntraday, askPriceFromProposal, windowResizeEvent } from 'binary-utils';
import { ErrorMsg, PurchaseFailed } from 'binary-components';
import Modal from '../containers/Modal';
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
        tradeParams: PropTypes.object,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            dynamicKey: 0,
        };
    }

    // componentWillMount() {
    //     this.onAssetChange();
    // }

    /**
     * componentDidUpdate is used instead of componentWillReceiveProps because the onAssetChange depends on updated
     * props, which only accessible after component update
     * it's a mistake here that method to be reuse are coupled with component states
     * TODO: redesign so that side effect are handle elsewhere
     */
    componentDidUpdate(prevProps) {
        const { tradeParams } = this.props;

        if (tradeParams.symbol !== prevProps.tradeParams.symbol) {
            this.repaintSelf();
        }
        windowResizeEvent();
    }

    componentWillUnmount() {
        // fire action to saga
    }

    // onAssetChange = () => {
    //     const { contract, tradeParams } = this.props;
    //     const updatedAsset = changeAsset(tradeParams, contract, changeCategory);
    //     this.updateTradeParams(updatedAsset);
    //     this.repaintSelf();
    //     this.clearTradeError();
    // }

    onCloseModal = () => {
        const { index } = this.props;
        actions.updateTradeError(index, 'purchaseError', undefined);
    }

    onPurchase = () => {
        const { index, onPurchaseHook } = this.props;
        actions.purchaseByTradeId(index).then(onPurchaseHook);
    }

    // throttledProposalSubscription =
    //     throttle(index => actions.updatePriceProposalSubscription(index), isMobile ? 500 : 300);

    // updateTradeParams = params => {
    //     const { index } = this.props;
    //     actions.changeParams(index, params);
    // }

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
        const selectedType = tradeParams.type;
        const hasBarriers = tradeParams.barrier;
        const selectedTypeTradingOptions = contract[selectedCategory][selectedType];
        const barrierInfo = selectedTypeTradingOptions && selectedTypeTradingOptions.barriers;  // TODO: rename, this sucks

        const isIntraDay = isIntraday(tradeParams.duration, tradeParams.durationUnit);
        const showBarrier = selectedCategory !== 'spreads' &&
            selectedCategory !== 'digits' &&
            !tradeParams.dateStart &&
            !!hasBarriers;

        const payout = proposal && proposal.payout;

        const showDuration = !!tradeParams.duration;
        const isDigitType = selectedCategory === 'digits';
        const showSpreadBarrier = selectedCategory === 'spreads';

        const digitOptions = (isDigitType && barrierInfo) && barrierInfo.tick[0].value;

        const askPrice = askPriceFromProposal(proposal);

        const errorText = errorToShow(errors);

        return (
            <div className="trade-params" key={this.state.dynamicKey} style={style}>
                <Modal shown={!!errors.purchaseError} onClose={this.onCloseModal}>
                    <PurchaseFailed failure={errors.purchaseError} />
                </Modal>
                <ErrorMsg text={contract.error || errorText} />
                <AssetPickerDropDown
                    index={index}
                    selectedSymbol={tradeParams.symbol}
                    selectedSymbolName={tradeParams.symbolName}
                />
                <TradeTypeDropDown
                    index={index}
                    contract={contract}
                    tradeParams={tradeParams}
                />
                {isDigitType &&
                    <DigitBarrierCard
                        barrier={+tradeParams.barrier}
                        digitOptions={digitOptions}
                        index={index}
                    />
                }
                {showBarrier &&
                    <BarrierCard
                        barrier={tradeParams.barrier}
                        barrier2={tradeParams.barrier2}
                        barrierInfo={barrierInfo}
                        barrierType={tradeParams.barrierType}
                        isIntraDay={isIntraDay}
                        pipSize={pipSize}
                        spot={proposal && +proposal.spot}
                    />
                }
                {showDuration && !showSpreadBarrier &&
                    <DurationCard
                        dateStart={tradeParams.dateStart}
                        duration={+tradeParams.duration}
                        durationUnit={tradeParams.durationUnit}
                        forwardStartingDuration={selectedTypeTradingOptions.forwardStartingDuration}
                        options={selectedTypeTradingOptions.durations}
                        index={index}
                    />
                }
                {showDuration && !showSpreadBarrier && selectedTypeTradingOptions.forwardStartingDuration &&
                    <ForwardStartingOptions
                        dateStart={tradeParams.dateStart}
                        forwardStartingDuration={selectedTypeTradingOptions.forwardStartingDuration}
                        startLaterOnly={!selectedTypeTradingOptions.durations}
                        index={index}
                    />
                }
                {!showSpreadBarrier &&
                    <StakeCard
                        amount={+tradeParams.amount}
                        isVirtual={false}
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
