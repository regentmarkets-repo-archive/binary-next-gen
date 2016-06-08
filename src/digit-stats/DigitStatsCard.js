import React, { Component } from 'react';
import DigitStatsChart from '../_common/DigitStatsChart';

export default class DigitStatsCard extends Component {

    render() {
        const stats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        return (
            <DigitStatsChart stats={stats} />
        );
    }
}
