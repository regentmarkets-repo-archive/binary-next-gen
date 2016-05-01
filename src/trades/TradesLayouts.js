import React, { PropTypes, Component } from 'react';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import FullTradeCard from '../fulltrade/FullTradeCard';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class TradesLayouts extends Component {

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
        const { assetsIsOpen, layoutN, trades, ticksForAllSymbols, contracts } = this.props;
        const layout = layouts[`Layout${trades.length}${layoutN}`];
        const layoutClass = `layout-${trades.length}-${layoutN}`;

        if (!layout) return null;

        const tradeComponents = trades.map((trade, index) =>
            <FullTradeCard
                {...this.props}
                key={index}
                index={index}
                marketIsOpen={assetsIsOpen[trade.symbol] && assetsIsOpen[trade.symbol].isOpen}
                trade={trade}
                ticks={ticksForAllSymbols[trade.symbol]}
                contract={contracts[trade.symbol]}
            />
        );

        return (
            <div className={styles.trades + ' ' + styles[layoutClass]}>
                {layout(tradeComponents)}
            </div>
        );
    }
}
