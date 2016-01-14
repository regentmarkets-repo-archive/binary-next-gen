import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fullTradeSelector } from './selectors';
import shouldPureComponentUpdate from 'react-pure-render/function';
import FullTradeCard from './FullTradeCard';

@connect(fullTradeSelector)
export default class FullTradeContainer extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return <FullTradeCard {...this.props} />;
    }
}
