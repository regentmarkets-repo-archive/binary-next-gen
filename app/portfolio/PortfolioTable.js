import React from 'react';
import { NumberPlain } from '../common';
import PortfolioRow from './PortfolioRow';

const calculatePortfolioTotals = (contracts) => ({
    purchase: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
    indicative: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
});

const PortfolioTable = ({contracts, onViewDetails}) => {
    const totals = calculatePortfolioTotals(contracts);

	contracts.slice().sort((x, y) => Math.sign(x.fmb_id, y.fmb_id));

	return (
		<table>
			<thead>
				<tr>
					<th>Ref.</th>
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
					<th><NumberPlain currency="USD" value={totals.purchase} /></th>
                    <th><NumberPlain currency="USD" value={totals.indicative} /></th>
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
