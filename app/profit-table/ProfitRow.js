import React from 'react';
import { NumberColored, NumberPlain } from '../common';
import { dateTimeStr } from '../common/DateUtils';

const ProfitRow = ({profit, onViewDetails}) => (
    <tr>
        <td>{dateTimeStr(profit.date)}</td>
        <td>{profit.ref}</td>
        <td>{profit.details}</td>
        <td><NumberPlain value={profit.purchasePrice} /></td>
        <td>{dateTimeStr(profit.saleDate)} {profit.saleDate.toString()}</td>
        <td><NumberPlain value={profit.salePrice} /></td>
        <td><NumberColored value={profit.profitLoss} /></td>
        <td><button onClick={onViewDetails.bind(this, profit)}>View</button></td>
    </tr>
);

ProfitRow.propTypes = {
	profit: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default ProfitRow;
