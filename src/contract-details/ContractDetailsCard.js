import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { secondsToTimeString } from '../_utils/DateUtils';
import { NumberColored, NumberPlain, Modal, LabeledText, M } from '../_common';
import ContractSoldDetails from './ContractSoldDetails';
import { forceUpdateAll } from '../_utils/ApiWorkaroundUtils';

const returnOnContract = (contract, proposal) => (proposal.bid_price - contract.buy_price) * 100 / contract.buy_price;
const ContractDetailsCard = ({ contract, proposal, nowEpoch, soldResultShown, actions }) => (
	<div>
		<Modal shown={!!soldResultShown} onClose={actions.closeSoldResult}>
			<ContractSoldDetails
				buyPrice={contract.buy_price}
				soldPrice={soldResultShown && soldResultShown.soldPrice}
				transID={soldResultShown && soldResultShown.transId}
			/>
		</Modal>
		<table>
			<thead>
				<tr>
					<th><M m="Start Time" /></th>
					<th><M m="Current Spot Time" /></th>
					<th><M m="End Time" /></th>
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
					<th><M m="Entry Spot" /></th>
					<th><M m="Current Spot" /></th>
					<th><M m="Exit Spot" /></th>
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
					<th><M m="Purchase Price" /></th>
					<th><M m="Indicative Price" /></th>
					<th><M m="Final Price" /></th>
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
					<th colSpan="3"><M m="Description" /></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colSpan="3">{contract.longcode}</td>
				</tr>
			</tbody>
		</table>
		{proposal && (proposal.is_valid_to_sell === 1) ?
		<div>
			<LabeledText id="market-price" label="Market Price" value={proposal.bid_price}/>
			<button
				onClick={() => {
					actions.sellContract(contract.contract_id, 0);
					forceUpdateAll();
					}
				}
			>
				Sell on market
			</button>
		</div> :
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
