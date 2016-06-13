import React, { Component, PropTypes } from 'react';
import DigitStatsChart from 'binary-components/lib/DigitStatsChart';
import DigitStatsFilter from './DigitStatsFilter';

export default class DigitStatsCard extends Component {
    static propTypes = {
        stats: PropTypes.array,
    };

    render() {
        const stats = this.props.stats;
        // const stats = [4, 1, 6, 3, 4, 5, 6, 7, 8, 9];

        if (stats.length === 0) return null;

        return (
            <div className="digit-stats-card">
                <DigitStatsFilter />
                <DigitStatsChart stats={stats} orientation="vertical" />
            </div>
        );
    }
}
