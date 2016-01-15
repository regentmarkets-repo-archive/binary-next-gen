import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fullTradeSelectors } from '../_selectors/FullTradeSelectors';
import shouldPureComponentUpdate from 'react-pure-render/function';
import FullTradeCard from './FullTradeCard';

@connect(fullTradeSelectors)
export default class FullTradeContainer extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return <FullTradeCard {...this.props} />;
    }
}
