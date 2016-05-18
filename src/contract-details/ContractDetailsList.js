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
				<ContractDetailString label="Asset" value={contract.display_name} />
				<ContractDetailString label="Contract Type" value={contract.contract_type} />
				<ContractDetailString
					label="Reference ID"
					value={transactionIdsToString(contract.transaction_ids)}
				/>
				<ContractDetailString label={'Description'} value={contract.longcode} />

				<ContractDetailString label={'Entry Tick'} value={contract.entry_tick} />
				<ContractDetailTime contract={contract} code={'entry_tick_time'} />

				<ContractDetailString label={'Exit tick'} value={contract.exit_tick} />
				<ContractDetailTime contract={contract} code={'exit_tick_time'} />

				{/* Duration related */}
				{/* only forward starting <ContractDetailsDate contract={contract} code={'purchase_time'} /> */}
				<ContractDetailTime contract={contract} code={'date_start'} />
				<ContractDetailTime contract={contract} code={'date_expiry'} />
				{/* <ContractDetailsDate contract={contract} code={'sell_time'} /> */}

				{/* Price related */}
				<ContractDetailMoney contract={contract} code={'bid_price'} />
				<ContractDetailMoney contract={contract} code={'buy_price'} />
				<ContractDetailMoney contract={contract} code={'sell_price'} />

				{contract.barrier && <ContractDetailString label={'Barrier'} value={contract.barrier} />}
				{contract.low_barrier && <ContractDetailString label={'Barrier'} value={contract.low_barrier} />}
				{contract.high_barrier && <ContractDetailString label={'Barrier'} value={contract.high_barrier} />}

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
