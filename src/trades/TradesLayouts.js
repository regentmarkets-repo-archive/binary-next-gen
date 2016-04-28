import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import FullTradeCard from '../fulltrade/FullTradeCard';
import layoutData from '../_store/tradeLayoutData';
import sequence from 'binary-utils/lib/sequence';
import styles from '../layouts.css';

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
        const { actions, assetsIsOpen, currency, layoutN, trades, ticksForAllSymbols, contracts } = this.props;
        const tradesCount = trades.length;
        const contSize = tradesCount > 0 ? layoutData[tradesCount][layoutN] : undefined;
        const classes = classNames({
            [styles.trades]: true,
            [styles[`layout-${trades.length}-${layoutN}`]]: true,
        });
        const firstContStyle = classNames({
            [styles[`layout-container-${trades.length}-${layoutN}-1`]]: true,
        });
        const secondContStyle = classNames({
            [styles[`layout-container-${trades.length}-${layoutN}-2`]]: true,
        });
        return (
                <div className={classes}>
                    <div className={firstContStyle}>
                    {contSize && sequence(contSize.firstContainer).map(index =>
                        <FullTradeCard
                            key={index}
                            index={index}
                            currency={currency}
                            actions={actions}
                            marketIsOpen={assetsIsOpen[trades[index].symbol] &&
                                assetsIsOpen[trades[index].symbol].isOpen}
                            trade={trades[index]}
                            ticks={ticksForAllSymbols[trades[index].symbol]}
                            contract={contracts[trades[index].symbol]}
                            onClick={() => actions.changeActiveTrade(index)}
                        />
                      )}
                      </div>
                      <div className={secondContStyle}>
                        {contSize && sequence(contSize.secondContainer).map(index =>
                                <FullTradeCard
                                    key={index}
                                    index={index}
                                    currency={currency}
                                    actions={actions}
                                    marketIsOpen={assetsIsOpen[trades[index].symbol] &&
                                        assetsIsOpen[trades[index].symbol].isOpen}
                                    trade={trades[index]}
                                    ticks={ticksForAllSymbols[trades[index].symbol]}
                                    contract={contracts[trades[index].symbol]}
                                    onClick={() => actions.changeActiveTrade(index)}
                                />
                        )}
                        </div>
            </div>
        );
    }
}
