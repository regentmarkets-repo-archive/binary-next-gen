import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { BinaryChart } from 'binary-charts';
import PurchaseFailed from '../_common/PurchaseFailed';
import Modal from '../containers/Modal';
import BuyButton from '../tick-trade/BuyButton';
import { askPriceFromProposal } from '../_utils/TradeUtils';
import FullTradeParams from './FullTradeParams';
import BoughtContractCard from './BoughtContractCard';

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
        contractBought: PropTypes.object,
        index: PropTypes.number.isRequired,
        trade: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['tick', 'full']).isRequired,
        ticks: PropTypes.array,
    };

    render() {
        const { actions, index, trade, currency, ticks, contract } = this.props;
        const selectedSymbol = trade.symbol;
        const mostRecentContractBought = trade.mostRecentContractBought;
        const disabled = !contract || trade.disabled;

        return (
            <div disabled={disabled} className={'trade-panel'}>
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
                {
                    mostRecentContractBought ?
                        <BoughtContractCard actions={actions} contract={mostRecentContractBought} tradeId={index} /> :
                        <div>
                            <FullTradeParams
                                {...this.props}
                                disabled={disabled}
                                contract={disabled ? mockedContract : contract}
                            />
                            <BuyButton
                                askPrice={askPriceFromProposal(trade.proposal)}
                                currency={currency}
                                disabled={disabled}
                                onClick={() => actions.purchaseByTradeId(index)}
                            />
                        </div>
                }
            </div>
        );
    }
}
