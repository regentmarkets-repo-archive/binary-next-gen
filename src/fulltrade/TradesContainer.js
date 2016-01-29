import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { fullTradesSelector } from './../_selectors/FullTradeSelectors';
import TradesGrid from './TradesGrid';
// import TradesTabs from './TradesTabs';

@connect(fullTradesSelector)
export default class TradesContainer extends React.Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TradesGrid {...this.props} />
        );
    }
}
