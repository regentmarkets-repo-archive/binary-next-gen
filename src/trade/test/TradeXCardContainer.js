import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeXCard from './TradeXCard';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeXCardContainer extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <TradeXCard {...(immutableChildrenToJS(this.props))} />
        );
    }
}
