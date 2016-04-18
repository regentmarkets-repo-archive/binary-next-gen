import React, { PropTypes, Component } from 'react';
import FullTradeCard from '../fulltrade/FullTradeCard';
import { mockedContract } from './../_constants/MockContract';

export default class TradesTabs extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        activeTradeIndex: PropTypes.number.isRequired,
        assetsIsOpen: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        ticksForAllSymbols: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
        assetBtnClicked: PropTypes.bool,
    };

    componentDidUpdate(prevProps) {
        const prevTradeLength = prevProps.trades.length;
        const { actions, trades, activeTradeIndex, assetBtnClicked } = this.props;
        const currTradeLength = trades.length;

        if (currTradeLength > prevTradeLength) {
            actions.updatePriceProposalSubscription(prevTradeLength);
        } else if (assetBtnClicked) {
            actions.updatePriceProposalSubscription(activeTradeIndex);
            actions.setAssetBtnClicked(false);
        }
    }

    render() {
        const { actions, activeTradeIndex, assetsIsOpen, contracts, trades, ticksForAllSymbols, currency } = this.props;
        const activeTrade = trades[activeTradeIndex];
        return (
            <div className="trades-tabs">
                <FullTradeCard
                    index={activeTradeIndex}
                    actions={actions}
                    trade={activeTrade}
                    marketIsOpen={assetsIsOpen[activeTrade.symbol] && assetsIsOpen[activeTrade.symbol].isOpen}
                    ticks={ticksForAllSymbols[activeTrade.symbol]}
                    contract={contracts[activeTrade.symbol]}
                    currency={currency}
                />
            </div>
        );
    }
}
