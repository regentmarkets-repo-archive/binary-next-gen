import React from 'react';

const PortfolioRow = (props) => {
    const { contract, onViewDetails } = props;

    return (
        <tr>
            <td>{contract.fmb_id}</td>
            <td>{contract.longcode}</td>
            <td>{contract.currency}&nbsp;{contract.buy_price}</td>
            <td>{contract.currency}&nbsp;{contract.bid_price}</td>
            <td><button onClick={onViewDetails.bind(this, contract)}>View</button></td>
        </tr>
    );
};

PortfolioRow.propTypes = {
	contract: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default PortfolioRow;
