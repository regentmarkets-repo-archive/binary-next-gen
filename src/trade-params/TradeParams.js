import React, { PureComponent, PropTypes } from 'react';
import { askPriceFromProposal, windowResizeEvent } from 'binary-utils';
import { ServerErrorMsg, ErrorMsg } from 'binary-components';
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

const errorKeys = [
    'contractError',
    'barrierError',
    'durationError',
    'stakeError',
    'proposalError',
    'purchaseError',
    'other',
];

const errorToShow = errorObj =>
    errorObj[errorKeys.find(x => errorObj[x])];

const expirtyTypeFromDurationUnit = durationUnit => ({
    t: 'tick',
    s: 'intraday',
    m: 'intraday',
    h: 'intraday',
    d: 'daily',
}[durationUnit]);

const categoryHasBarrier = category =>
    category !== 'spreads' &&
    category !== 'risefall' &&
    category !== 'digits' &&
    category !== 'asian';

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
        forceRenderCount: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        pipSize: PropTypes.number,
        proposal: PropTypes.object,
        purchaseError: PropTypes.string,
        style: PropTypes.object,
        tradeParams: PropTypes.object,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            dynamicKey: props.forceRenderCount,
        };
    }

    /**
     * componentDidUpdate is used instead of componentWillReceiveProps because the onAssetChange depends on updated
     * props, which only accessible after component update
     * it's a mistake here that method to be reuse are coupled with component states
     * TODO: redesign so that side effect are handle elsewhere
     */
    componentWillReceiveProps(newProps) {
        this.setState({ dynamicKey: newProps.forceRenderCount });
        windowResizeEvent();
    }

    onCloseModal = () => {
        const { index } = this.props;
        actions.updateTradeError(index, 'purchaseError', undefined);
    }

    onPurchase = () => {
        const { index, proposal } = this.props;
        actions.reqPurchase(index, proposal.ask_price);
    }

    clearTradeError = () => {
        const { index } = this.props;
        actions.clearTradeError(index);
    }

    render() {
        const { contract, currency, disabled, errors, index,
            pipSize, proposal, style, tradeParams } = this.props;

        /**
         * Race condition happen when contract is updated before tradeCategory (async)
         * thus we need to check if the tradeCategory is valid, if not valid simply use the 1st valid category
         */
        const selectedCategory = tradeParams.tradeCategory;
        const selectedType = tradeParams.type;
        const selectedTypeTradingOptions = contract[selectedCategory][selectedType];
        const barrierInfo = selectedTypeTradingOptions && selectedTypeTradingOptions.barriers;  // TODO: rename, this sucks
        const expiryType = expirtyTypeFromDurationUnit(tradeParams.durationUnit);
        const showBarrier = categoryHasBarrier(selectedCategory) && !tradeParams.dateStart;

        const payout = proposal && proposal.payout;

        const showDuration = !!tradeParams.duration;
        const isDigitType = selectedCategory === 'digits';

        const showSpreadBarrier = selectedCategory === 'spreads';

        const digitOptions = (isDigitType && barrierInfo) && barrierInfo.tick[0].values;
        const askPrice = askPriceFromProposal(proposal);
        const longcode = proposal && proposal.longcode;
        const serverError = errors.serverError;
        const nonServerError = errorToShow(errors);

        return (
            <div className="trade-params" key={this.state.dynamicKey} style={style}>
                {serverError ? <ServerErrorMsg text={serverError} /> : <ErrorMsg text={nonServerError} />}
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
                        expiryType={expiryType}
                        index={index}
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
                    longcode={longcode}
                    onClick={this.onPurchase}
                />
            </div>
        );
    }
}
