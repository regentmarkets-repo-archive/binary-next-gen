import React, { PropTypes } from 'react';
import { M, NumberPlain } from '../_common';

const PortfolioRow = ({ compact, contract, proposal, onViewDetails }) => (
    <tr onClick={() => onViewDetails(contract)}>
        <td>{contract.contract_id}</td>
        <td><NumberPlain currency={contract.currency} value={contract.buy_price} /></td>
        <td>{proposal && <NumberPlain currency={contract.currency} value={proposal.bid_price} />}</td>
        {!compact &&
            <td>
                <button onClick={() => onViewDetails(contract)}>
                    <M m="View" />
                </button>
            </td>
        }
    </tr>
);

PortfolioRow.propTypes = {
    compact: PropTypes.bool,
	contract: PropTypes.object.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default PortfolioRow;
