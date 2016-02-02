import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { fullTradesSelector } from './../_selectors/FullTradeSelectors';
import TradesGrid from './TradesGrid';
import TradesTabs from './TradesTabs';

@connect(fullTradesSelector)
export default class TradesContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    static propTypes = {
        tradeMode: PropTypes.string.isRequired,
    };

    render() {
        const { tradeMode } = this.props;
        return tradeMode === 'grid' ?
                <TradesGrid {...this.props} /> :
                <TradesTabs {...this.props} />;
    }
}
