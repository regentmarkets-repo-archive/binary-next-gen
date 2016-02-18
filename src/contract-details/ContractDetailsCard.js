import React, { PropTypes, Component } from 'react';
import { FormattedTime } from 'react-intl';
import { secondsToTimeString } from '../_utils/DateUtils';
import M from '../_common/M';
import LabeledText from '../_common/LabeledText';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';
import Modal from '../containers/Modal';
import ContractSoldDetails from './ContractSoldDetails';

const returnOnContract = contract => (contract.bid_price - contract.buy_price) * 100 / contract.buy_price;

const ContractDetailsCard = ({ contract, nowEpoch, soldResultShown, actions }) => (
	<div>
		<Modal shown={!!soldResultShown} onClose={actions.closeSoldResult}>
			<ContractSoldDetails
				buyPrice={contract.buy_price}
				soldPrice={soldResultShown && soldResultShown.soldPrice}
				transId={soldResultShown && soldResultShown.transId}
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
				{contract && <tr>
					<td><FormattedTime value={contract.date_start * 1000} format="full" /></td>
					<td><FormattedTime value={+contract.current_spot_time * 1000} format="full" /></td>
					<td><FormattedTime value={contract.date_expiry * 1000} format="full" /></td>
				</tr>}
				<tr>
					<td></td>
					<td>
						{contract && secondsToTimeString(nowEpoch - contract.date_start)}
					</td>
					<td>{contract && secondsToTimeString(contract.date_expiry - nowEpoch)}</td>
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
				{contract && <tr>
					<td>{contract.entry_spot}</td>
					<td><NumberColored value={contract.current_spot} isProfit={v => v - contract.entry_spot}/></td>
					<td>{(contract.exit_spot || '-')}</td>
				</tr>}
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
						{contract &&
						<NumberColored
						value={contract.bid_price}
						currency={contract.currency}
						isProfit={v => v - contract.buy_price}
						/>}
					</td>
					<td>{contract.final_price
							? <NumberPlain value={contract.final_price} currency={contract.currency}/>
							: '-'}</td>
				</tr>
				<tr>
					<td></td>
					<td>{contract && <NumberColored value={returnOnContract(contract).toFixed(2)} />}%</td>
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
		{contract && (contract.is_valid_to_sell === 1) ?
		<div>
			<LabeledText id="market-price" label="Market Price" value={contract.bid_price}/>
			<button onClick={() => actions.sellContract(contract.contract_id, 0)}>
				Sell at market
			</button>
		</div> :
		<div>{contract && contract.validation_error}</div>}
	</div>
);

ContractDetailsCard.propTypes = {
	contract: PropTypes.object,
	nowEpoch: PropTypes.number,
	soldResultShown: PropTypes.object,
	actions: PropTypes.object,
};

export default ContractDetailsCard;
