import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { secondsToTimeString } from '../_utils/DateUtils';
import { NumberColored, NumberPlain } from '../_common';

const returnOnContract = (contract, proposal) => (proposal.bid_price - contract.buy_price) * 100 / contract.buy_price;

const ContractDetailsCard = ({ contract, proposal }) => (
	<div>
		<table>
			<thead>
				<tr>
					<th>Start Time</th>
					<th>Current Spot Time</th>
					<th>End Time</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{proposal && <FormattedTime value={proposal.date_start * 1000} format="full" />}</td>
					<td>{proposal && <FormattedTime value={window.parseInt(proposal.current_spot_time) * 1000} format="full" />}</td>
					<td>{proposal && <FormattedTime value={proposal.date_expiry * 1000} format="full" />}</td>
				</tr>
				<tr>
					<td></td>
					<td>
						{proposal && secondsToTimeString(window.parseInt(proposal.current_spot_time) - proposal.date_start)}
					</td>
					<td>{proposal && secondsToTimeString(proposal.date_expiry - window.parseInt(proposal.current_spot_time))}</td>
				</tr>
			</tbody>
			<thead>
				<tr>
					<th>Entry Spot</th>
					<th>Current Spot</th>
					<th>Exit Spot</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{proposal && proposal.entry_spot}</td>
					<td>{proposal && <NumberColored value={proposal.current_spot} isProfit={v => v - proposal.entry_spot}/>}</td>
					<td>{proposal && (proposal.exit_spot || '-')}</td>
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
					<td><NumberPlain value={contract.buy_price} currency={contract.currency}/></td>
					<td>
						{proposal &&
						<NumberColored
						value={proposal.bid_price}
						currency={contract.currency}
						isProfit={v => v - contract.buy_price}
						/>}
					</td>
					<td>{contract.final_price ? <NumberPlain value={contract.final_price} currency={contract.currency}/> : '-'}</td>
				</tr>
				<tr>
					<td></td>
					<td>{proposal && <NumberColored value={returnOnContract(contract, proposal).toFixed(2)} />}%</td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
);

ContractDetailsCard.propTypes = {
	contract: PropTypes.object,
	proposal: PropTypes.object,
};

export default ContractDetailsCard;
