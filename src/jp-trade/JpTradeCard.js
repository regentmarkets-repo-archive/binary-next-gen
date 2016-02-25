import React, { PropTypes, Component } from 'react';

export default class JpTradeCard extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div>
                <div id="trading-types-picker" />
                <select id="period">
                    <option value="1456299900_1456308000">2016-02-24 10:00:00 (2h15m)</option>
                    <option value="1456289100_1456308000">2016-02-24 10:00:00 (5h15m)</option>
                    <option value="1456303500_1456322400">2016-02-24 14:00:00 (5h15m)</option>
                    <option value="1456272000_1456358399">2016-02-24 23:59:59 (0d)</option>
                    <option value="1456099200_1456520400">2016-02-26 21:00:00 (1W)</option>
                    <option value="1454284800_1456790399">2016-02-29 23:59:59 (1M)</option>
                    <option value="1451606400_1459468799">2016-03-31 23:59:59 (3M)</option>
                    <option value="1451606400_1483131600">2016-12-30 21:00:00 (1Y)</option>
                </select>
                <div id="payout-picker" />
                <div id="excersise-price-table" />
            </div>
        );
    }
}
