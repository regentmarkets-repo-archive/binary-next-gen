import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradeViewChartContainer from './TradeViewChartContainer';
import TradeParamsContainer from './TradeParamsContainer';

export default class TradeXCard extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        compact: PropTypes.bool,
        chartProps: PropTypes.object.isRequired,
        paramsProps: PropTypes.object.isRequired,
    };

    shouldComponentUpdate = shouldPureComponentUpdate;
    render() {
        const { actions, chartProps, compact, paramsProps } = this.props;
        return (
            <div className="trade-panel">
                <div className="trade-chart-container">
                    <TradeViewChartContainer actions={actions} chartProps={chartProps} />
                </div>
                <TradeParamsContainer actions={actions} paramsProps={paramsProps} compact={compact} />
            </div>
        );
    }
}
