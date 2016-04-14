import React, { PropTypes, Component } from 'react';
import FullTradeCard from '../fulltrade/FullTradeCard';

export default class TradesLayouts extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assetsIsOpen: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        ticksForAllSymbols: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
    };

    render() {
        const { actions, assetsIsOpen, currency, trades, ticksForAllSymbols, contracts } = this.props;

        return (
            <div className="trades layout-2-2">
                {trades.map((trade, index) =>
                    <FullTradeCard
                        key={index}
                        index={index}
                        currency={currency}
                        actions={actions}
                        marketIsOpen={assetsIsOpen[trade.symbol].isOpen}
                        trade={trade}
                        ticks={ticksForAllSymbols[trade.symbol]}
                        contract={contracts[trade.symbol]}
                        onClick={() => actions.changeActiveTrade(index)}
                    />
                )}
            </div>
        );
    }
}
