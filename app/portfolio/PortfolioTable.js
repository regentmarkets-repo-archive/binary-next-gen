import React from 'react';
import PortfolioRow from './PortfolioRow';

const calculatePortfolioTotals = (contracts) => ({
    purchase: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
    indicative: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
});

const PortfolioTable = (props) => {
    const { contracts, onViewDetails } = props;
    const totals = calculatePortfolioTotals(contracts);

	contracts.slice().sort((x, y) => Math.sign(x.fmb_id, y.fmb_id));

	return (
		<table>
			<thead>
				<tr>
					<th>Ref.</th>
					<th>Contract</th>
					<th>Purchase</th>
                    <th>Indicative</th>
                    <th></th>
				</tr>
			</thead>
			<tbody>
                {contracts.map((c, i) => <PortfolioRow key={i} contract={c} onViewDetails={onViewDetails} />)}
			</tbody>
			<thead>
				<tr>
					<th></th>
					<th></th>
					<th>USD&nbsp;{totals.purchase.toFixed(2)}</th>
                    <th>USD&nbsp;{totals.indicative.toFixed(2)}</th>
                    <th></th>
				</tr>
			</thead>
		</table>
	);
};

PortfolioTable.propTypes = {
	contracts: React.PropTypes.array.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default PortfolioTable;
