import React, { PropTypes } from 'react';
import EChart from './EChart';
import chartOptionsTrade from './ChartOptionsTrade';

export default class ChartTradeVisualizer extends React.Component {

    static propTypes = {
        tradeParameters: PropTypes.object, // .isRequired,
    };

    render() {
        return (
            <EChart
                style={{ width: '100%', height: '400px' }}
                options={chartOptionsTrade}
                {...this.props}
            />
        );
    }
}
