import React, { PureComponent } from 'react';
import ContractDetailString from './ContractDetailString';
import ContractDetailTime from './ContractDetailTime';
import ContractDetailMoney from './ContractDetailMoney';
import ContractDetailCustom from './ContractDetailCustom';

const transactionIdsToString = ({ buy, sell }) =>
	buy + (sell ? ' – ' + sell : '');

const isDigitTrade = contract =>
	contract.contract_type && contract.contract_type.includes('DIGIT');

export default class ContractDetailsList extends PureComponent {

	props: {
		contract: Contract,
	};

	render() {
		const { contract } = this.props;

		// exit_tick_time is not return for contract that exit earlier
		// eg. TOUCH and EndsINOut
		// instead sell_time and sell_spot is return and means the time where contract ends
		const contractHandleExitEarlier = Object.assign({}, contract);
		if (contract.sell_time && !contract.exit_tick_time) {
			contractHandleExitEarlier.exit_tick_time = contract.sell_time;
			contractHandleExitEarlier.exit_tick = contract.sell_spot;
		}
		const idsStr = transactionIdsToString(contract.transaction_ids);

		return (
			<div className="contract-details-list">
				<ContractDetailString contract={contract} code={'contract_id'} />
				<ContractDetailCustom label="Reference ID" value={idsStr} />
				<ContractDetailTime contract={contract} code={'date_start'} />
				<ContractDetailString contract={contract} code={'entry_spot'} />
				<ContractDetailTime contract={contract} code={'entry_tick_time'} />
				{!isDigitTrade(contract) && <ContractDetailCustom label={'Barrier'} value={contract.barrier} />}
				<ContractDetailCustom label={'Low Barrier'} value={contract.low_barrier} />
				<ContractDetailCustom label={'High Barrier'} value={contract.high_barrier} />
				<ContractDetailMoney contract={contract} code={'payout'} />
				<ContractDetailMoney contract={contract} code={'buy_price'} />
				<ContractDetailString contract={contractHandleExitEarlier} code={'exit_tick'} />
				<ContractDetailTime contract={contractHandleExitEarlier} code={'exit_tick_time'} />
				{!!contract.is_forward_starting && <ContractDetailMoney contract={contract} code="bid_price" />}
				<ContractDetailMoney contract={contract} code={'sell_price'} />
				<ContractDetailTime contract={contract} code={'sell_time'} />
			</div>
		);
	}
}
