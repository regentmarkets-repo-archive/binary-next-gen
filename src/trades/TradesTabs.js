import React, { PropTypes, Component } from 'react';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
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
        const closable = trades.length > 1;
        return (
            <div className="trades-tabs">
                <TabList
                    activeIndex={activeTradeIndex}
                    onChange={index => actions.changeActiveTrade(index)}
                >
                    {trades.map((trade, index) =>
                        <Tab
                            key={index}
                            text={trade.symbolName}
                            closable={closable}
                            onClose={() => {
                                actions.removeTrade(index);
                            }}
                        />
                    )}
                </TabList>
                <FullTradeCard
                    index={activeTradeIndex}
                    actions={actions}
                    trade={activeTrade}
                    marketIsOpen={assetsIsOpen[activeTrade.symbol].isOpen}
                    ticks={ticksForAllSymbols[activeTrade.symbol]}
                    contract={contracts[activeTrade.symbol]}
                    currency={currency}
                />
            </div>
        );
    }
}
