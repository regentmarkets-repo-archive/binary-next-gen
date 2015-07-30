import React from 'react';

export default class PortfolioRow {

    render() {

        const { contract, onViewDetails } = this.props;

        return (
            <tr>
                <td>{contract.fmb_id}</td>
                <td>{contract.longcode}</td>
                <td>{contract.currency} {contract.buy_price}</td>
                <td>{contract.currency} {contract.buy_price}</td>
                <td><button onClick={onViewDetails.bind(this, contract)}>View</button></td>
            </tr>
        );
    }
}
