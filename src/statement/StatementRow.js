import React from 'react';
import { FormattedDate } from 'react-intl';
import { NumberPlain, NumberColored } from '../_common';

const StatementRow = ({compact, transaction}) => (
    <tr>
        <td><FormattedDate value={new Date(transaction.transaction_time * 1000)} /></td>
        {!compact && <td>{transaction.transaction_id}</td>}
        <td className="trade-action">{transaction.action_type}</td>
        <td><NumberColored value={transaction.amount} /></td>
        <td><NumberPlain value={transaction.balance_after} /></td>
    </tr>
);

StatementRow.propTypes = {
    compact: React.PropTypes.bool,
    transaction: React.PropTypes.object.isRequired,
};

export default StatementRow;
