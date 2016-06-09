import React, { Component } from 'react';
import Label from 'binary-components/lib/Label';

export default class DigitStatsFilter extends Component {

    render() {
        return (
            <div className="digit-stats-filter">
                <Label text="Number of Ticks" />
                <select defaultValue="100">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select>
            </div>
        );
    }
}
