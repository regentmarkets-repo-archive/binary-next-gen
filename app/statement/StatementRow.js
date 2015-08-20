import React from 'react';
import moment from 'moment';

export default class StatementRow {

    static propTypes = {
		transaction: React.PropTypes.object.isRequired,
        onViewDetails: React.PropTypes.func.isRequired,
	};

    render() {
        const { transaction, onViewDetails } = this.props;

        return (
            <tr>
                <td>{moment.unix(transaction.transaction_time).format('h:mm:ss a')}</td>
                <td>{transaction.id}</td>
                <td>{transaction.action_type}</td>
                <td>{transaction.longcode}???</td>
                <td>{(+transaction.amount).toFixed(2)}</td>
                <td>{(+transaction.balance_after).toFixed(2)}</td>
                <td><button onClick={onViewDetails.bind(this, transaction)}>View</button></td>
            </tr>
        );
    }
}
