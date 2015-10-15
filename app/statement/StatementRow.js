import React from 'react';
import { dateTimeStr } from '../common/DateUtils';
import { NumberPlain, NumberColored } from '../common';

const StatementRow = ({transaction, onViewDetails}) => (
    <tr>
        <td>{dateTimeStr(transaction.transaction_time)}</td>
        <td>{transaction.transaction_id}</td>
        <td className="trade-action">{transaction.action_type}</td>
        <td><NumberColored value={transaction.amount} /></td>
        <td><NumberPlain value={transaction.balance_after} /></td>
        <td><button onClick={onViewDetails.bind(this, transaction)}>View</button></td>
    </tr>
);

StatementRow.propTypes = {
    transaction: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default StatementRow;
