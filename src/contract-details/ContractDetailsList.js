import React, { PropTypes, Component } from 'react';
import ContractDetailString from './ContractDetailString';
import ContractDetailTime from './ContractDetailTime';
import ContractDetailMoney from './ContractDetailMoney';

const transactionIdsToString = ({ buy, sell }) =>
	buy + (sell ? '–' + sell : '');

export default class ContractDetailsList extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		nowEpoch: PropTypes.number,
		transactionId: PropTypes.number,
		actions: PropTypes.object,
	};

	render() {
		const { contract } = this.props;
		const sold = !!contract.sell_price;
		// const potentialProfit = toMoney(contract.payout - contract.buy_price);
		// const profit = sold && toMoney(contract.sell_price - contract.buy_price);

		return (
			<div className="trade-panel-receipt">
				<ContractDetailString label="Contract ID" value={contract.contract_id} />
				<ContractDetailString
					label="Reference ID"
					value={transactionIdsToString(contract.transaction_ids)}
				/>
				{/* <ContractDetailsDate contract={contract} code={'purchase_time'} /> */}
				<ContractDetailTime contract={contract} code={'date_start'} />
				<ContractDetailTime contract={contract} code={'date_expiry'} />
				{/* <ContractDetailsDate contract={contract} code={'sell_time'} /> */}
				<ContractDetailString label="Remaining Time" value="" />
				<ContractDetailMoney contract={contract} code={'entry_spot'} />
				<ContractDetailMoney contract={contract} code={'barrier'} />
				{/* Purchase Price */}
				<ContractDetailMoney contract={contract} code={'exit_tick'} />
				<ContractDetailTime contract={contract} code={'exit_tick_time'} />
				{/* Price */}
				{/* Profit/Loss */}
				<ContractDetailMoney contract={contract} code={'entry_tick'} />
				<ContractDetailMoney contract={contract} code={'exit_tick'} />
				<ContractDetailMoney contract={contract} code={'buy_price'} />
				{sold ? <ContractDetailMoney contract={contract} code={'sell_price'} /> : null}
				<ContractDetailMoney contract={contract} code={'bid_price'} />
				{/* <div>
					<M m={sold ? 'Profit' : 'Potential Profit'} />
					value={sold ? profit : potentialProfit}
					currency={contract.currency}
					isProfit={v => v}
				</div> */}
			</div>
		);
	}
}
