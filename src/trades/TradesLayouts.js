import React, { PropTypes, Component } from 'react';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import shouldPureComponentUpdate from 'react-pure-render/function';
import FullTradeCard from '../fulltrade/FullTradeCard';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class TradesLayouts extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assetsIsOpen: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        ticksForAllSymbols: PropTypes.object.isRequired,
        trades: PropTypes.array.isRequired,
        tradesCount: PropTypes.number.isRequired,
        layoutN: PropTypes.number.isRequired,
        contracts: PropTypes.object.isRequired,
    };

    componentWillMount() {
        const { actions, layoutN, tradesCount } = this.props;
        actions.changeActiveLayout(tradesCount, layoutN);
    }

    componentDidUpdate() {
        windowResizeEvent();
    }

    render() {
        const { actions, assetsIsOpen, contracts, currency, layoutN, trades, ticksForAllSymbols } = this.props;
        const layout = layouts[`Layout${trades.length}${layoutN}`];
        const layoutClass = styles[`layout-${trades.length}-${layoutN}`];

        if (!layout) return null;

        const tradeComponents = trades.map((trade, index) =>
            <FullTradeCard
                {...trade}
                actions={actions}
                currency={currency}
                key={index}
                index={index}
                marketIsOpen={assetsIsOpen[trade.params.symbol] && assetsIsOpen[trade.params.symbol].isOpen}
                ticks={ticksForAllSymbols[trade.params.symbol]}
                contract={contracts[trade.params.symbol]}
                tradingTime={trade.tradingTime}
            />
        );

        return layout(tradeComponents, `${styles.trades} ${layoutClass}`);
    }
}
