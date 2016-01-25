import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import { NumberPlain, NumberColored } from '../_common';
import { epochToDate } from '../_utils/DateUtils';

const StatementRow = ({ compact, transaction }) => (
    <tr>
        <td><FormattedDate value={epochToDate(transaction.transaction_time)} /></td>
        {!compact && <td>{transaction.transaction_id}</td>}
        <td className="trade-action">{transaction.action_type}</td>
        <td><NumberColored value={transaction.amount} /></td>
        <td><NumberPlain value={transaction.balance_after} /></td>
    </tr>
);

StatementRow.propTypes = {
    compact: PropTypes.bool,
    transaction: PropTypes.object.isRequired,
};

export default StatementRow;
