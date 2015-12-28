import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { secondsToTimeString } from '../_utils/DateUtils';
import { NumberColored, NumberPlain, Modal } from '../_common';

const returnOnContract = (contract, proposal) => (proposal.bid_price - contract.buy_price) * 100 / contract.buy_price;
const profitInPercentage = (buy, sell) => (sell - buy) / buy * 100;
const ContractDetailsCard = ({ contract, proposal, nowEpoch, soldResultShown, actions }) => (
	<div>
		<Modal shown={soldResultShown} onClose={actions.closeSoldResult}>
			<h3>Trade Confirmation</h3>
			<div>You have sold the following contract.</div>
			<table>
				<thead>
					<tr>
						<th>Buy Price</th>
						<th>Sale Price</th>
						<th>Return</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{contract.buy_price}</td>
						<td>{soldResultShown && soldResultShown.soldPrice}</td>
						<td>{soldResultShown && profitInPercentage(contract.buy_price, soldResultShown.soldPrice)}%</td>
					</tr>
				</tbody>
			</table>
			<div>Your transaction reference no is {soldResultShown && soldResultShown.transId}</div>
		</Modal>
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
						{proposal && secondsToTimeString(nowEpoch - proposal.date_start)}
					</td>
					<td>{proposal && secondsToTimeString(proposal.date_expiry - nowEpoch)}</td>
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
			<thead>
				<tr>
					<th colSpan="3">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colSpan="3">{contract.longcode}</td>
				</tr>
			</tbody>
		</table>
		{proposal && (proposal.is_valid_to_sell === 1) ?
		<button onClick={() => actions.sellContract(contract.contract_id, 0)}>Sell</button> :
		<div>{proposal && proposal.validation_error}</div>}
	</div>
);

ContractDetailsCard.propTypes = {
	contract: PropTypes.object,
	proposal: PropTypes.object,
	nowEpoch: PropTypes.number,
	soldResultShown: PropTypes.object,
	actions: PropTypes.object,
};

export default ContractDetailsCard;
