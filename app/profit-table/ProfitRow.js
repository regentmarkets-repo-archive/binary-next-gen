import React from 'react';
import { NumberColored, NumberPlain } from '../common';

const ProfitRow = ({transaction, onViewDetails}) => (
    <tr>
        <td>{transaction.get('contract_id')}</td>
        <td>{transaction.get('purchase_time')}</td>
        <td><NumberPlain value={transaction.get('buy_price')} /></td>
        <td>{transaction.get('sell_time')}</td>
        <td><NumberPlain value={transaction.get('sell_price')} /></td>
        <td><NumberColored value={transaction.get('sell_price') - transaction.get('buy_price')} /></td>
        <td><button onClick={onViewDetails.bind(this, transaction)}>View</button></td>
    </tr>
);

ProfitRow.propTypes = {
	transaction: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitRow;
