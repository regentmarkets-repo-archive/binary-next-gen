import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCard from './TradeXCard';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { singleTradeSelector } from './TradeParamsSelector';

@connect(singleTradeSelector())
export default class TradeXCardContainer extends Component {
    // shouldComponentUpdate = shouldPureComponentUpdate;

    shouldComponentUpdate(nextProps) {
        console.log(this.props === nextProps);
        return shouldPureComponentUpdate.apply(this, nextProps);
    }

    render() {
        return (
            <TradeXCard {...(immutableChildrenToJS(this.props))} />
        );
    }
}
