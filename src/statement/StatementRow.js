import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { NumberPlain, NumberColored } from '../_common';

export default class StatementRow extends React.Component {

    static propTypes = {
        compact: PropTypes.bool,
        ref: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        actionType: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        balanceAfter: PropTypes.number.isRequired,
    };

    render() {
        const { compact, ref, date, actionType, amount, balanceAfter } = this.props;

        return (
            <tr>
                <td><FormattedTime value={date} format="full" /></td>
                {!compact && <td>{ref}</td>}
                <td className="trade-action">{actionType}</td>
                <td><NumberColored value={amount} /></td>
                <td><NumberPlain value={balanceAfter} /></td>
            </tr>
        );
    }
}
