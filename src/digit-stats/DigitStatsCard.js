import React, { Component } from 'react';
import DigitStatsChart from 'binary-components/lib/DigitStatsChart';
import DigitStatsFilter from './DigitStatsFilter';

export default class DigitStatsCard extends Component {

    render() {
        const stats = [4, 1, 6, 3, 4, 5, 6, 7, 8, 9];

        return (
            <div className="digit-stats-card">
                <DigitStatsFilter />
                <DigitStatsChart stats={stats} orientation="vertical" />
            </div>
        );
    }
}
