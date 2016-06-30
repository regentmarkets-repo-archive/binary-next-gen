import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCardContainer from './TradeXCardContainer';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import { singleTest } from './TradeParamsSelector';

@connect(singleTest)
export default class SingleTradeXCard extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TradeXCardContainer {...(immutableChildrenToJS(this.props))} />
        );
    }
}

