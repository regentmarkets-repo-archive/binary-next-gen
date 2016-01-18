import React, { PropTypes } from 'react';
import { NumberPlain, M } from '../_common';
import PortfolioRow from './PortfolioRow';

const PortfolioTable = ({ compact, contracts, proposals, onViewDetails, purchaseTotal, indicativeTotal }) => {
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
                {contracts.map((c, i) =>
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
					<th><NumberPlain currency="USD" value={purchaseTotal} /></th>
                    <th><NumberPlain currency="USD" value={indicativeTotal} /></th>
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
