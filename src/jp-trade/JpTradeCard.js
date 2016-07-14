import React, { PureComponent } from 'react';
import JpPayoutPicker from './JpPayoutPicker';
import JpPeriodPicker from './JpPeriodPicker';
import JpTradeTypesPicker from './JpTradeTypesPicker';

export default class JpTradeCard extends PureComponent {

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
