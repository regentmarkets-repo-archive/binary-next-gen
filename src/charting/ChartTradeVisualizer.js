import React, { PropTypes } from 'react';
import EChart from './EChart';
import chartOptionsTrade from './options/ChartOptionsTrade';
// import chartOptionsLineTests from './options/chartOptionsLineTests';
// import chartOptionsLineTests from './options/chartOptionsLine1';

const data = [1, 4, 2, 5, 3, 2, 0, 1, 4, 2, 5, 3, 2, 0];
const theme = {
    gridColor: '#eee',
    axisTextColor: '#333',
};

export default class ChartTradeVisualizer extends React.Component {

    static propTypes = {
        tradeParameters: PropTypes.object.isRequired,
    };

    render() {
        const options = chartOptionsTrade({ data, theme });
        return (
            <EChart
                style={{ width: '100%', height: '400px' }}
                options={options}
                {...this.props}
            />
        );
    }
}
