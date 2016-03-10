import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import { BinaryChart } from 'binary-charts';
import M from '../_common/M';

export default class ContractDetails extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
	};

	render() {
		const { contract, ticks } = this.props;
		const returnOnContract = ((contract.bid_price - contract.buy_price) * 100 / contract.buy_price).toFixed(2);

		return (
			<div>
				<BinaryChart ticks={ticks} contract={contract} />
				<table>
					<thead>
						<tr>
							<th><M m="Start Time" /></th>
							<th><M m="Now" /></th>
							<th><M m="End Time" /></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><FormattedTime value={contract.date_start} /></td>
							<td></td>		// todo: should be now
							<td><FormattedTime value={contract.expiry_time} /></td>
						</tr>
						<tr>
							<td></td>
							<td>now - start</td>
							<td>end - now</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th><M m="Entry Spot" /></th>
							<th><M m="Current Spot" /></th>
							<th><M m="Exit Spot" /></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{contract.entry_spot}</td>
							<td>{contract.spot}</td>
							<td>{contract.exit_spot}</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th><M m="Purchase Price" /></th>
							<th><M m="Indicative Price" /></th>
							<th><M m="Final Price" /></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{contract.currency}&nbsp;{contract.buy_price}</td>
							<td>{contract.currency}&nbsp;{contract.bid_price}</td>
							<td>{contract.currency}&nbsp;{contract.final_price}</td>
						</tr>
						<tr>
							<td></td>
							<td>{returnOnContract}%</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
