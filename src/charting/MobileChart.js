import React, { PropTypes, Component } from 'react';
import EChart from './EChart';
import SizeProvider from '../_common/SizeProvider';
import createOptions from './options/MobileChartOptions';

const theme = {
    background: 'white',
    line: 'rgba(42, 48, 82, 0.8)',
    fill: 'rgba(42, 48, 82, 0.2)',
    text: '#999',
    grid: '#eee',
    axisText: 'rgba(64, 68, 72, .5)',
};

export default class TradeChart extends Component {

    static defaultProps = {
        entryTime: Math.floor(Date.now() / 1000) - 10000,
    };

    static propTypes = {
        history: PropTypes.array.isRequired,
        entryTime: PropTypes.number,
        expireTime: PropTypes.number,
    };

    render() {
        const { history, entryTime, expireTime } = this.props;
        if (history.length === 0) return null;

        const verticalLineOpt = [];

        if (entryTime) {
            const minQuote = history.reduce((a, b) => Math.min(a, b.quote), 0);
            const maXQuote = history.reduce((a, b) => Math.max(a, b.quote), 0);
            verticalLineOpt[0] = { x: entryTime, min: minQuote, max: maXQuote, name: 'Entry Time' };
            if (expireTime) {
                verticalLineOpt[1] = { x: expireTime, min: minQuote, max: maXQuote, name: 'Expire Time' };
            }
        }

        const options = createOptions(history, theme, verticalLineOpt);

        return (
            <SizeProvider style={{ width: '100%', height: '150px' }}>
                <EChart
                    options={options}
                    {...this.props}
                />
            </SizeProvider>
        );
    }
}
