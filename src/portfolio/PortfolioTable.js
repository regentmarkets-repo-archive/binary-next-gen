import React, { PropTypes } from 'react';
import { NumberPlain, M } from '../_common';
import PortfolioRow from './PortfolioRow';

const totalPurchase = contracts => contracts.reduce((x, y) => x + +y.buy_price, 0);
const totalIndicative = () => proposals => {
	return proposals.values().reduce((x, y) => x + +y, 0);
};
const contractNotExpired = (contracts, proposals) => contracts
	.filter(c => {
		const p = proposals.get(c.contract_id);
		if (!p) {
			return true;
		}
		return p.is_expired === 0;
	});

const PortfolioTable = ({ compact, contracts, proposals, onViewDetails }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>
						<M m="Ref." />
					</th>
					<th>
						<M m="Purchase" />
					</th>
                    <th>
						<M m="Indicative" />
					</th>
                    {!compact && <th></th>}
				</tr>
			</thead>
			<tbody>
                {contractNotExpired(contracts, proposals)
					.map((c, i) =>
					<PortfolioRow
						key={i}
						compact={compact}
						contract={c}
						proposal={proposals.get(c.contract_id)}
						history={history}
						onViewDetails={onViewDetails}
					/>
				)}
			</tbody>
			<tfoot>
				<tr>
                    <th></th>
					<th><NumberPlain currency="USD" value={totalPurchase(contractNotExpired(contracts, proposals))} /></th>
                    <th><NumberPlain currency="USD" value={totalIndicative(proposals.filter(p => p.is_expired === 0))} /></th>
                    {!compact && <th></th>}
				</tr>
			</tfoot>
		</table>
	);
};

PortfolioTable.propTypes = {
    compact: PropTypes.bool,
	contracts: PropTypes.object.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default PortfolioTable;
