import React from 'react';
import { shortDateStr } from '../common/DateUtils';

const StatementRow = (props) => {
    const { transaction, onViewDetails } = props;

    return (
        <tr>
            <td>{shortDateStr(transaction.transaction_time)}</td>
            <td>{transaction.id}</td>
            <td>{transaction.action_type}</td>
            <td>{transaction.longcode}???</td>
            <td>{(+transaction.amount).toFixed(2)}</td>
            <td>{(+transaction.balance_after).toFixed(2)}</td>
            <td><button onClick={onViewDetails.bind(this, transaction)}>View</button></td>
        </tr>
    );
};

StatementRow.propTypes = {
    transaction: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default StatementRow;
