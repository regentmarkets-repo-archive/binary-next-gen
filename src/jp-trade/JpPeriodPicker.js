import React, { PropTypes, Component } from 'react';

export default class JpPeriodPicker extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        return (
            <select id="period">
                <option>2016-02-24 10:00:00 (2h15m)</option>
                <option>2016-02-24 10:00:00 (5h15m)</option>
                <option>2016-02-24 14:00:00 (5h15m)</option>
                <option>2016-02-24 23:59:59 (0d)</option>
                <option>2016-02-26 21:00:00 (1W)</option>
                <option>2016-02-29 23:59:59 (1M)</option>
                <option>2016-03-31 23:59:59 (3M)</option>
                <option>2016-12-30 21:00:00 (1Y)</option>
            </select>
        );
    }
}

/* <label><input name="period" type="radio" />1 Year (2016-12-30 21:00:00)</label>
<label><input name="period" type="radio" />3 Months (2016-03-31 23:59:59)</label>
<label><input name="period" type="radio" />1 Month (2016-02-29 23:59:59)</label>
<label><input name="period" type="radio" />1 Month (2016-02-24 10:00:00)</label>
<label><input name="period" type="radio" />1 Day (2016-02-24 23:59:59)</label>
<label><input name="period" type="radio" />5h15m (2016-02-24 14:00:00)</label>
<label><input name="period" type="radio" />5h15m (2016-02-24 10:00:00)</label>
<label><input name="period" type="radio" />2h15m (2016-02-24 10:00:00)</label> */
