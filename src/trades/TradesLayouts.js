import React, { PropTypes, Component } from 'react';
import windowResizeEvent from 'binary-utils/lib/windowResizeEvent';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeCard from '../trade/TradeCard';
import * as layouts from '../layouts';
import styles from '../layouts/layouts.css';

export default class TradesLayouts extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        actions: PropTypes.object.isRequired,
        assetsIsOpen: PropTypes.object.isRequired,
        contracts: PropTypes.object.isRequired,
        currency: PropTypes.string.isRequired,
        layoutN: PropTypes.number.isRequired,
        licensesForAllSymbol: PropTypes.object.isRequired,
        paramsList: PropTypes.array.isRequired,
        pipSizeList: PropTypes.array.isRequired,
        proposalInfoList: PropTypes.array.isRequired,
        purchaseInfoList: PropTypes.array.isRequired,
        ticksForAllSymbols: PropTypes.object.isRequired,
        tradesCount: PropTypes.number.isRequired,
        tradingTimeList: PropTypes.array.isRequired,
        uiStateList: PropTypes.array.isRequired,
        tradeErrorList: PropTypes.array.isRequired,
    };

    componentWillMount() {
        const { actions, layoutN, tradesCount } = this.props;
        actions.changeActiveLayout(tradesCount, layoutN);
    }

    componentDidUpdate() {
        windowResizeEvent();
    }

    render() {
        const {
            actions,
            assetsIsOpen,
            contracts,
            currency,
            layoutN,
            licensesForAllSymbol,
            paramsList,
            pipSizeList,
            proposalInfoList,
            purchaseInfoList,
            tradingTimeList,
            uiStateList,
            ticksForAllSymbols,
            tradesCount,
            tradeErrorList,
        } = this.props;
        const layout = layouts[`Layout${tradesCount}${layoutN}`];
        const layoutClass = styles[`layout-${tradesCount}-${layoutN}`];

        if (!layout) return null;

        const tradeComponents = paramsList.map((param, index) =>
            <TradeCard
                actions={actions}
                currency={currency}
                key={index}
                index={index}
                feedLicense={licensesForAllSymbol[param.symbol]}
                marketIsOpen={assetsIsOpen[param.symbol] && assetsIsOpen[param.symbol].isOpen}
                ticks={ticksForAllSymbols[param.symbol]}
                contract={contracts[param.symbol]}
                params={param}
                pipSize={pipSizeList[index]}
                purchaseInfo={purchaseInfoList[index]}
                proposalInfo={proposalInfoList[index]}
                uiState={uiStateList[index]}
                tradingTime={tradingTimeList[index]}
                tradeErrors={tradeErrorList[index]}
            />
        );

        return layout(tradeComponents, `${styles.trades} ${layoutClass}`);
    }
}
