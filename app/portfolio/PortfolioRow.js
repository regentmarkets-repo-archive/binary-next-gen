import React from 'react';
import { NumberPlain } from '../common';

const PortfolioRow = (props) => {
    const { compact, contract, proposal, onViewDetails } = props;

    return (
        <tr>
            <td>{contract.fmb_id}</td>
            <td><NumberPlain currency={contract.currency} value={contract.buy_price} /></td>
            <td>{proposal && <NumberPlain currency={contract.currency} value={proposal.bid_price} />}</td>
            {!compact && <td><button onClick={onViewDetails.bind(this, contract)}>View</button></td>}
        </tr>
    );
};

PortfolioRow.propTypes = {
    compact: React.PropTypes.bool,
	contract: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default PortfolioRow;
