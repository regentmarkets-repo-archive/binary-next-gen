import React, { Component } from 'react';
import JpPayoutPicker from './JpPayoutPicker';
import JpPeriodPicker from './JpPeriodPicker';
import JpTradeTypesPicker from './JpTradeTypesPicker';

export default class JpTradeCard extends Component {

    render() {
        return (
            <div className="trades-jp">
                <JpTradeTypesPicker />
                <JpPeriodPicker />
                <JpPayoutPicker />
            </div>
        );
    }
}
