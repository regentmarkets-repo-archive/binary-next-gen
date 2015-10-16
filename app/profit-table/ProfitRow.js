import React from 'react';
import { NumberColored, NumberPlain } from '../common';
import { dateTimeStr } from '../common/DateUtils';

const ProfitRow = ({transaction, onViewDetails}) => (
    <tr>
        <td>{dateTimeStr(transaction.date)}</td>
        <td>{transaction.contract_id}</td>
        <td><NumberPlain value={transaction.buy_price} /></td>
        <td>{dateTimeStr(transaction.saleDate)} {transaction.sell_time}</td>
        <td><NumberPlain value={transaction.sell_price} /></td>
        <td><NumberColored value={transaction.profitLoss} /></td>
        <td><button onClick={onViewDetails.bind(this, transaction)}>View</button></td>
    </tr>
);

ProfitRow.propTypes = {
	transaction: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitRow;
