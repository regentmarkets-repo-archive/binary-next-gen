import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import PurchaseFailed from '../_common/PurchaseFailed';
import PurchaseConfirmation from '../_common/PurchaseConfirmation';
import Modal from '../containers/Modal';
import BuyButton from '../tick-trade/BuyButton';
import { askPriceFromProposal } from '../_utils/TradeUtils';
import FullTradeParams from './FullTradeParams';

import { mockedContract } from './../_constants/MockContract';

export default class FullTradeCard extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static defaultProps = {
        type: 'full',
    };

    static propTypes = {
        actions: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        contract: PropTypes.object,
        index: PropTypes.number.isRequired,
        trade: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
    };

    render() {
        const { actions, index, trade, currency, ticks } = this.props;
        const selectedSymbol = trade.symbol;
        const receipt = trade.receipt;
        const contract = this.props.contract || mockedContract;
        const disabled = contract === mockedContract || trade.disabled;

        return (
            <div disabled={disabled} className={'trade-panel'}>
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
                <BinaryChart
                    className="trade-chart"
                    symbol={selectedSymbol}
                    ticks={ticks}
                    trade={trade}
                />
                <FullTradeParams
                    {...this.props}
                    disabled={disabled}
                    contract={contract}
                />
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
