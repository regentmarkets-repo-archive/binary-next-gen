import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCard from './TradeXCard';
import { singleTradeSelector } from '../trade-params/TradeParamsSelector';

@connect(singleTradeSelector())
export default class TradeXCardContainer extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TradeXCard {...this.props} />
        );
    }
}
