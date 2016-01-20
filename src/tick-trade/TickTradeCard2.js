import React, { PropTypes } from 'react';
import { Modal, M, NumberPlain, PurchaseFailed, PurchaseConfirmation } from '../_common';
import MobileChart from '../charting/MobileChart';
import TickTradeParameters from './TickTradeParameters2';

export default class TickTradeCard extends React.Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assets: PropTypes.array.isRequired,        // all assets available
        currency: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        tick: PropTypes.array.isRequired,          // ticks for this trade instance, correspond to symbol selected
        trade: PropTypes.object.isRequired,         // trade params for this trade instance
    };

    updateHelper(field, name) {
        const { actions, id, trade } = this.props;
        actions.updateTradeParams(id, field, name);
        actions.updatePriceProposalSubscription(id, trade);
    }

    placeOrder() {
        const { actions, id, trade } = this.props;
        actions.purchaseByTradeID(id, trade);
    }

    componentDidMount() {
        const { actions, id, trade } = this.props;
        actions.updatePriceProposalSubscription(id, trade);
    }

    render() {
        const { assets, currency, id, trade, tick } = this.props;
        const history = tick;
        const spot = history.length > 0 ? history[history.length - 1].quote : null;
        const receipt = trade.receipt;

        return (
            <div className="tick-trade-mobile">
                <Modal shown={!!trade.buy_error}
                       onClose={() => this.updateHelper('buy_error', false)}
                >
                    <PurchaseFailed failure={trade.buy_error} />
                </Modal>
                <Modal shown={!!receipt}
                       onClose={() => this.updateHelper('receipt', undefined)}
                >
                    <PurchaseConfirmation receipt={receipt} />
                </Modal>
                <MobileChart
                    className="trade-chart"
                    history={history}
                    showBarrier={tick.type === 'CALL'}
                    spot={spot}
                />
                <TickTradeParameters
                    assets={assets}
                    currency={currency}
                    durationChange={e => this.updateHelper('duration', e.target.value)}
                    id={id}
                    trade={trade}
                />
                <button
                    className="buy-btn"
                    onClick={() => this.placeOrder()}
                    disabled={trade.buying}
                >
                    <M m="Purchase for " />
                    <NumberPlain currency={currency} value={trade.proposal && trade.proposal.ask_price} />
                </button>
            </div>
        );
    }
}
