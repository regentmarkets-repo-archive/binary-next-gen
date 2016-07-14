import React, { PureComponent, PropTypes } from 'react';
import TradeViewChart from './TradeViewChart';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

export default class TradeViewChartContainer extends PureComponent {

    static propTypes = {
        chartProps: PropTypes.object.isRequired,
    };

    render() {
        return (
            <TradeViewChart {...immutableChildrenToJS(this.props.chartProps)} />
        );
    }
}
