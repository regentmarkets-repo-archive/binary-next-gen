import React, { PropTypes, Component } from 'react';
import ContractDetailString from './ContractDetailString';
import ContractDetailTime from './ContractDetailTime';
import ContractDetailMoney from './ContractDetailMoney';
import M from '../_common/M';

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
				<M m="Contract Information" className="receipt-header" />
				<ContractDetailString label="Asset" value={contract.display_name} />
				<ContractDetailString label="Contract Type" value={contract.contract_type} />
				<ContractDetailString
					label="Reference ID"
					value={transactionIdsToString(contract.transaction_ids)}
				/>

				<ContractDetailString label={'Entry Tick'} value={contract.entry_tick} />
				<ContractDetailTime contract={contract} code={'entry_tick_time'} />

				<ContractDetailTime contract={contract} code={'date_start'} />
				<ContractDetailTime contract={contract} code={'date_expiry'} />
				<ContractDetailMoney contract={contract} code={'buy_price'} />

				{contract.barrier && <ContractDetailString label={'Barrier'} value={contract.barrier} />}
				{contract.low_barrier && <ContractDetailString label={'Barrier'} value={contract.low_barrier} />}
				{contract.high_barrier && <ContractDetailString label={'Barrier'} value={contract.high_barrier} />}

				<M m="Contract Expiry" className="receipt-header" />
				{contract.is_forward_starting ? <ContractDetailMoney contract={contract} code="bid_price" /> : null}
				<ContractDetailString label={'Exit tick'} value={contract.exit_tick} />
				<ContractDetailTime contract={contract} code={'exit_tick_time'} />
				<ContractDetailMoney contract={contract} code={'sell_price'} />
				<ContractDetailMoney contract={contract} code={'sell_time'} />
				<ContractDetailString label={'Sell Tick'} value={contract.sell_spot} />

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
