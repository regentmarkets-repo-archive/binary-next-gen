import React, { PropTypes } from 'react';
import { NumberPlain, M } from '../_common';
import PortfolioItem from './PortfolioItem';

export default class PortfolioList extends React.Component {

	static propTypes = {
		compact: PropTypes.bool,
		contracts: PropTypes.object.isRequired,
		purchaseTotal: PropTypes.number.isRequired,
		indicativeTotal: PropTypes.number.isRequired,
		onViewDetails: PropTypes.func.isRequired,
	};

	render() {
		const { compact, contracts, onViewDetails, purchaseTotal, indicativeTotal } = this.props;

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
					{Object.keys(contracts).map((c, i) =>
						<PortfolioItem
							key={i}
							compact={compact}
							contract={contracts[c]}
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
	}
}
