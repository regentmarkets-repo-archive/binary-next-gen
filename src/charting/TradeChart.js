import React, { PropTypes } from 'react';
import EChart from './EChart';
import chartOptionsTrade from './options/ChartOptionsTrade';

const theme = {
    gridColor: '#eee',
    axisTextColor: 'rgb(64, 68, 72)',
};

export default class TradeChart extends React.Component {

    static propTypes = {
        history: PropTypes.array.isRequired,
        spot: PropTypes.number,
    };

    static defaultProps = {
        history: [],
        spot: 0,
    }

    render() {
        const { history, spot } = this.props;
        const options = chartOptionsTrade({ data: history.map(x => x.quote), spot: +spot, theme });
        return (
            <EChart
                style={{ width: '344px', height: '200px', margin: '0 auto' }}
                options={options}
                {...this.props}
            />
        );
    }
}
