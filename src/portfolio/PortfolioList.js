import React, { PropTypes, PureComponent } from 'react';
import Th from 'binary-components/lib/Th';
import NumberPlain from 'binary-components/lib/NumberPlain';
import PortfolioItem from './PortfolioItem';

export default class PortfolioList extends PureComponent {

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
						<Th className="textual" text="Ref." />
						<Th className="numeric" text="Purchase" />
						<Th className="numeric" text="Indicative" />
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
						<th />
						<th className="numeric">
							<NumberPlain currency="USD" value={purchaseTotal} />
						</th>
						<th className="numeric">
							<NumberPlain currency="USD" value={indicativeTotal} />
						</th>
					</tr>
				</tfoot>
			</table>
		);
	}
}
