import React from 'react';

export default class PortfolioRow {

    static propTypes = {
		contract: React.PropTypes.object.isRequired,
        onViewDetails: React.PropTypes.func.isRequired,
	};

    render() {
        const { contract, onViewDetails } = this.props;

        return (
            <tr>
                <td>{contract.fmb_id}</td>
                <td>{contract.longcode}</td>
                <td>{contract.currency}&nbsp;{contract.buy_price}</td>
                <td>{contract.currency}&nbsp;{contract.bid_price}</td>
                <td><button onClick={onViewDetails.bind(this, contract)}>View</button></td>
            </tr>
        );
    }
}
