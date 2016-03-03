import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import NumberPlain from '../_common/NumberPlain';

export default class DailyPricesRow extends Component {

    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        open: PropTypes.number.isRequired,
        high: PropTypes.number.isRequired,
        low: PropTypes.number.isRequired,
        close: PropTypes.number.isRequired,
    };

    render() {
        const { date, open, high, low, close } = this.props;

        return (
            <tr>
                <td><FormattedDate value={date} /></td>
                <td><NumberPlain value={open} /></td>
                <td><NumberPlain value={high} /></td>
                <td><NumberPlain value={low} /></td>
                <td><NumberPlain value={close} /></td>
            </tr>
        );
    }
}
