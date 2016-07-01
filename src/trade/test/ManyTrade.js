import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCardContainer from './TradeXCardContainer';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { allTradesSelector } from './TradeListSelector';

@connect(allTradesSelector)
export default class ManyTrade extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        console.log(this.props);
        return (
            <TradeXCardContainer {...(immutableChildrenToJS(this.props))} />
        );
    }
}


