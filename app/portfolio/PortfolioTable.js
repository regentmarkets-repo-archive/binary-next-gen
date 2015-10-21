import React from 'react';
import { NumberPlain } from '../common';
import PortfolioRow from './PortfolioRow';

const totalPurchase = contracts => contracts.reduce((x, y) => x + +y.buy_price, 0);
const totalIndicative = () => 0; // proposals =>  proposals.values().reduce((x, y) => x + +y, 0);

const PortfolioTable = ({compact, contracts, proposals, onViewDetails}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Ref.</th>
					<th>Purchase</th>
                    <th>Indicative</th>
                    {!compact && <th></th>}
				</tr>
			</thead>
			<tbody>
                {contracts.map((c, i) =>
                    <PortfolioRow
                        key={i}
                        compact={compact}
                        contract={c}
                        proposal={proposals.get(c.contract_id)}
                        onViewDetails={onViewDetails} />)}
			</tbody>
			<tfoot>
				<tr>
                    <th></th>
					<th><NumberPlain currency="USD" value={totalPurchase(contracts)} /></th>
                    <th><NumberPlain currency="USD" value={totalIndicative(proposals)} /></th>
                    {!compact && <th></th>}
				</tr>
			</tfoot>
		</table>
	);
};

PortfolioTable.propTypes = {
    compact: React.PropTypes.bool,
	contracts: React.PropTypes.object.isRequired,
    onViewDetails: React.PropTypes.func.isRequired,
};

export default PortfolioTable;
