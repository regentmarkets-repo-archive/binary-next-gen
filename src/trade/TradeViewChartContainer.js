import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeViewChart from './TradeViewChart';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeViewChartContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        chartProps: PropTypes.object.isRequired,
    };
    shouldComponentUpdate = shouldPureComponentUpdate;
    render() {
        return (
            <TradeViewChart actions={this.props.actions} {...(immutableChildrenToJS(this.props.chartProps))} />
        );
    }
}
