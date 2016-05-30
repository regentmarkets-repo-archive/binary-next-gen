import React, { PropTypes, Component } from 'react';
import PurchaseFailed from '../_common/PurchaseFailed';
import PurchaseConfirmation from '../_common/PurchaseConfirmation';
import Modal from '../containers/Modal';
import { BinaryChart } from 'binary-charts';
import TickTradeParameters from './TickTradeParameters';
import BuyButton from './BuyButton';
import askPriceFromProposal from 'binary-utils/lib/askPriceFromProposal';

export default class TickTradeCard extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.array.isRequired,        // all assets available
        currency: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        ticks: PropTypes.array.isRequired,          // ticks for this trade instance, correspond to symbol selected
        trade: PropTypes.object.isRequired,         // trade params for this trade instance
    };

    updateHelper(field, name) {
        const { actions, index, trade } = this.props;
        actions.updateTradeParams(index, field, name);
        actions.updatePriceProposalSubscription(index, trade);
    }

    placeOrder() {
        const { actions, index, trade } = this.props;
        actions.purchaseByTradeId(index, trade);
    }

    componentDidMount() {
        const { actions, index, trade } = this.props;
        actions.updatePriceProposalSubscription(index, trade);
    }

    render() {
        const { assets, currency, index, trade, ticks } = this.props;
        const receipt = trade.receipt;
        return (
            <div className="tick-trade-mobile">
                <Modal
                    shown={!!trade.buy_error}
                    onClose={() => this.updateHelper('buy_error', false)}
                >
                    <PurchaseFailed failure={trade.buy_error} />
                </Modal>
                <Modal
                    shown={!!receipt}
                    onClose={() => this.updateHelper('receipt', undefined)}
                >
                    <PurchaseConfirmation receipt={receipt} onClose={() => this.updateHelper('receipt', undefined)} />
                </Modal>
                <BinaryChart
                    className="trade-chart"
                    ticks={ticks}
                    trade={trade}
                />
                <TickTradeParameters
                    assets={assets}
                    currency={currency}
                    durationChange={e => this.updateHelper('duration', e.target.value)}
                    index={index}
                    trade={trade}
                />
                <BuyButton
                    askPrice={askPriceFromProposal(trade.proposal)}
                    currency={currency}
                    disabled={trade.buying}
                    onClick={() => this.placeOrder()}
                />
            </div>
        );
    }
}
