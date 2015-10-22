import React from 'react';
import { timeStr } from '../_utils/DateUtils';

const returnOnContract = (contract, proposal) => (proposal.bid_price - contract.buy_price) * 100 / contract.buy_price;

const ContractDetailsCard = ({contract, proposal}) => (
	<div>
		<table>
			<thead>
				<tr>
					<th>Start Time</th>
					<th>Now</th>
					<th>End Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{timeStr(contract.date_start)}</td>
					<td>{proposal && timeStr(proposal.spot_time)}</td>
					<td>{timeStr(contract.expiry_time)}</td>
				</tr>
				<tr>
					<td></td>
					<td>now - start</td>
					<td>end - now</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th>Entry Spot</th>
					<th>Current Spot</th>
					<th>Exit Spot</th>
				</tr>
				<tr>
					<th>???</th>
					<th>{proposal && proposal.spot}</th>
					<th>???</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{contract.entry_spot}</td>
					<td>{proposal && proposal.bid_price}</td>
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
					<th>Purchase Price</th>
					<th>Indicative Price</th>
					<th>Final Price</th>
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
					<td>{proposal && returnOnContract(contract, proposal).toFixed(2)}%</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
);

ContractDetailsCard.propTypes = {
	contract: React.PropTypes.object,
	proposal: React.PropTypes.object,
};

export default ContractDetailsCard;
