import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { NumberPlain, NumberColored } from '../_common';
import { epochToDate } from '../_utils/DateUtils';

export default class StatementRow extends React.Component {

    static propTypes = {
        compact: PropTypes.bool,
        transaction: PropTypes.object.isRequired,
    };

    render() {
        const { compact, transaction } = this.props;

        return (
            <tr>
                <td><FormattedTime value={epochToDate(transaction.transaction_time)} format="full" /></td>
                {!compact && <td>{transaction.transaction_id}</td>}
                <td className="trade-action">{transaction.action_type}</td>
                <td><NumberColored value={transaction.amount} /></td>
                <td><NumberPlain value={transaction.balance_after} /></td>
            </tr>
        );
    }
}
