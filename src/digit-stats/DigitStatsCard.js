import React, { Component, PropTypes } from 'react';
import DigitStatsChart from 'binary-components/lib/DigitStatsChart';
import DigitStatsFilter from './DigitStatsFilter';

export default class DigitStatsCard extends Component {

    static propTypes = {
        filter: PropTypes.number,
        stats: PropTypes.array,
    };

    render() {
        const { filter, stats } = this.props;

        if (stats.length === 0) return null;

        return (
            <div className="digit-stats-card">
                <DigitStatsFilter value={filter} onChange={e => window.console.log(e)} />
                <DigitStatsChart stats={stats} orientation="vertical" />
            </div>
        );
    }
}
