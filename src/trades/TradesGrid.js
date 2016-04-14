import React, { PropTypes, Component } from 'react';
import TradeHeader from './TradeHeader';
import FullTradeCard from '../fulltrade/FullTradeCard';

export default class TradesGrid extends Component {

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

    componentDidUpdate() {
        const { assetBtnClicked, activeTradeIndex, actions } = this.props;
        if (assetBtnClicked) {
            actions.updatePriceProposalSubscription(activeTradeIndex);
            actions.setAssetBtnClicked(false);
        }
    }

    render() {
        const { actions, activeTradeIndex, assetsIsOpen, currency, trades, ticksForAllSymbols, contracts } = this.props;
        const closable = trades.length > 1;
        return (
            <div className="trades-grid layout-4-2">
                {trades.map((trade, index) =>
                    <div
                        key={index}
                        className={index === activeTradeIndex ? 'trade-container panel-active' : 'trade-container'}
                        onClick={() => actions.changeActiveTrade(index)}
                    >
                        <TradeHeader
                            assetName={trade.symbolName}
                            closable={closable}
                            onClosePanel={ev => {
                                actions.removeTrade(index);
                                ev.stopPropagation();
                            }}
                        />
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
