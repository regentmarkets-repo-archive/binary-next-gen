import React, { PropTypes } from 'react';
import EChart from './EChart';
import SizeProvider from '../_common/SizeProvider';
import createOptions from './options/MobileChartOptions';

const theme = {
    gridColor: '#eee',
    axisTextColor: 'rgba(64, 68, 72, .5)',
};

export default class TradeChart extends React.Component {

    static propTypes = {
        history: PropTypes.array.isRequired,
        spot: PropTypes.number,
    };

    static defaultProps = {
        history: [],
        spot: 0,
    };

    render() {
        const { history, spot } = this.props;
        const options = createOptions({ history, spot: +spot, theme });
        return (
            <SizeProvider style={{ width: '100%', height: '120px' }}>
                <EChart
                    options={options}
                    {...this.props}
                />
            </SizeProvider>
        );
    }
}
