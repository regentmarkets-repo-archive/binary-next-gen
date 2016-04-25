import React, { PropTypes, Component } from 'react';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import FullTradeCard from '../fulltrade/FullTradeCard';
import sequence from 'binary-utils/lib/sequence';
import layoutData from '../_store/tradeLayoutData';

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

        return (
                <div className={`trades layout-${trades.length}-${layoutN}`}>
                    <div className={`layout-container-${tradesCount}-${layoutN}-1`}>
                    {contSize && sequence(contSize.cont1).map(index =>
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
                      <div className={`layout-container-${tradesCount}-${layoutN}-2`}>
                        {contSize && sequence(contSize.cont2).map(index =>
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
