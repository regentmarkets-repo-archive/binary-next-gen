import React, { PureComponent, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import { NumberPlain } from 'binary-components';

export default class DailyPricesRow extends PureComponent {

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
                <td className="textual"><FormattedDate value={date} /></td>
                <td className="numeric"><NumberPlain value={open} /></td>
                <td className="numeric"><NumberPlain value={high} /></td>
                <td className="numeric"><NumberPlain value={low} /></td>
                <td className="numeric"><NumberPlain value={close} /></td>
            </tr>
        );
    }
}
