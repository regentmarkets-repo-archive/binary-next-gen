import React, { Component } from 'react';
import { connect } from 'react-redux';
import TradeCard from './TradeCard';
import singleTradeSelector from './SingleTradeSelector';

@connect(singleTradeSelector())
export default class TradeCardContainer extends Component {

    render() {
        return (
            <TradeCard {...this.props} />
        );
    }
}
