import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PurchaseFailed from '../_common/PurchaseFailed';
import PurchaseConfirmation from '../_common/PurchaseConfirmation';
import Modal from '../containers/Modal';
import TradeChart from '../charting/TradeChart';
import BuyButton from '../tick-trade/BuyButton';
import { askPriceFromProposal } from '../_utils/TradeUtils';
import TradeHeader from './TradeHeader';
import classNames from 'classnames';
import FullTradeParams from './FullTradeParams';

export default class BaseTradeCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        isActive: PropTypes.bool.isRequired,
        trade: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        tick: PropTypes.array,
    };

    render() {
        const { actions, isActive, index, trade, currency, tick } = this.props;
        const selectedSymbol = trade.symbol;
        const receipt = trade.receipt;
        const disabled = trade.disabled;
        const classes = classNames({
            'trade-panel': true,
            'panel-active': isActive,
        });

        return (
            <div disabled={disabled} className={classes} onClick={() => actions.changeActiveTrade(index)}>
                <Modal
                    shown={!!receipt}
                    onClose={() => actions.updateTradeParams(index, 'receipt', undefined)}
                >
                    <PurchaseConfirmation receipt={receipt} />
                </Modal>
                <Modal
                    shown={!!trade.buy_error}
                    onClose={() => actions.updateTradeParams(index, 'buy_error', undefined)}
                >
                    <PurchaseFailed failure={trade.buy_error} />
                </Modal>
                <TradeHeader
                    assetName={selectedSymbol}
                    onClosePanel={() => actions.removeTrade(index)}
                />
                {tick && <TradeChart
                    symbol={selectedSymbol}
                    history={tick}
                />}
                <FullTradeParams {...this.props} />
                <BuyButton
                    askPrice={askPriceFromProposal(trade.proposal)}
                    currency={currency}
                    disabled={disabled}
                    onClick={() => actions.purchaseByTradeId(index)}
                />
            </div>
        );
    }
}
