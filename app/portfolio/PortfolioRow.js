import React from 'react';
import { NumberPlain } from '../common';

const PortfolioRow = (props) => {
    const { contract, onViewDetails } = props;

    return (
        <tr>
            <td>{contract.fmb_id}</td>
            <td><NumberPlain currency={contract.currency} value={contract.buy_price} /></td>
            <td><NumberPlain currency={contract.currency} value={contract.bid_price} /></td>
            <td><button onClick={onViewDetails.bind(this, contract)}>View</button></td>
        </tr>
    );
};

PortfolioRow.propTypes = {
	contract: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default PortfolioRow;
