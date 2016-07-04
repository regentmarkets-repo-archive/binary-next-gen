import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeCard from './TradeCard';
import singleTradeSelector from './SingleTradeSelector';

@connect(singleTradeSelector())
export default class TradeCardContainer extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TradeCard {...this.props} />
        );
    }
}
