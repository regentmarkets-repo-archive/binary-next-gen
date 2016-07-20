import React, { Component, PropTypes } from 'react';
import TradeViewChart from './TradeViewChart';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeViewChartContainer extends Component {

    static propTypes = {
        chartProps: PropTypes.object.isRequired,
    };

    render() {
        return (
            <TradeViewChart {...immutableChildrenToJS(this.props.chartProps)} />
        );
    }
}
