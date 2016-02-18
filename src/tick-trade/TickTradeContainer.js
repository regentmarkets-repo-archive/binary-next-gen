import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import TickTradeCard from './TickTradeCard';
import { tickTradesSelector } from './TickTradeSelectors';

@connect(tickTradesSelector)
export default class TickTradeContainer extends Component {

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        console.log(this.props);
        return (
            <TickTradeCard
                index={0}
                {...immutableChildrenToJS(this.props)}
            />
        );
    }
}
