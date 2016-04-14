import React, { PropTypes, Component } from 'react';
import FullTradeCard from '../fulltrade/FullTradeCard';
import LayoutButtons from './LayoutButtons';

export default class TradesLayouts extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        activeTradeIndex: PropTypes.number.isRequired,
        assetsIsOpen: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        ticksForAllSymbols: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        contracts: PropTypes.object.isRequired,
    };

    render() {
        const { actions, activeTradeIndex, assetsIsOpen, currency, trades, ticksForAllSymbols, contracts } = this.props;

        return (
            <div className="trades layout-4-2">
                <LayoutButtons />
                {trades.map((trade, index) =>
                    <div
                        key={index}
                        className={index === activeTradeIndex ? 'trade-container panel-active' : 'trade-container'}
                        onClick={() => actions.changeActiveTrade(index)}
                    >
                        <FullTradeCard
                            index={index}
                            currency={currency}
                            actions={actions}
                            marketIsOpen={assetsIsOpen[trade.symbol].isOpen}
                            trade={trade}
                            ticks={ticksForAllSymbols[trade.symbol]}
                            contract={contracts[trade.symbol]}
                        />
                    </div>
                )}
            </div>
        );
    }
}
