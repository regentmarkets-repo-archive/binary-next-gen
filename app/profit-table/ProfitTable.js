import React from 'react';
import ProfitRow from './ProfitRow';

// const calculatePortfolioTotals = (contracts) => ({
//     purchase: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
//     indicative: contracts.length && contracts.reduce((x, y) => x + +y.buy_price, 0),
// });

const PortfolioTable = (props) => {
    const { contracts, onViewDetails } = props;
    // const totals = calculatePortfolioTotals(contracts);

	contracts.slice().sort((x, y) => Math.sign(x.fmb_id, y.fmb_id));

	return (
		<table>
			<thead>
				<tr>
                    <th>Purchase Date</th>
					<th>Ref.</th>
					<th>Contract</th>
					<th>Purchase Price</th>
                    <th>Sale Date</th>
                    <th>Sale Price</th>
                    <th>Profit/Loss</th>
                    <th></th>
				</tr>
			</thead>
			<tbody>
                {contracts.map((c, i) => <ProfitRow key={i} contract={c} onViewDetails={onViewDetails} />)}
			</tbody>
			<thead>
				<tr>
					<th>2015-09-30 - 2014-07-09</th>
					<th colSpan={4}></th>
					<th>Total Profit/Loss</th>
                    <th>-164.13</th>
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
