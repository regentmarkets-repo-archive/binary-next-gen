import React, { PropTypes, Component } from 'react';
import ContractDetailString from './ContractDetailString';
import ContractDetailTime from './ContractDetailTime';
import ContractDetailMoney from './ContractDetailMoney';
import ContractDetailCustom from './ContractDetailCustom';

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
		const idsStr = transactionIdsToString(contract.transaction_ids);

		return (
			<div className="contract-details-list">
				<ContractDetailString contract={contract} code={'contract_id'} />
				<ContractDetailCustom label="Reference ID" value={idsStr} />
				<ContractDetailTime contract={contract} code={'date_start'} />
				<ContractDetailString contract={contract} code={'entry_spot'} />
				<ContractDetailTime contract={contract} code={'entry_tick_time'} />
				{!contract.contract_type.includes('DIGIT') &&
					<ContractDetailCustom label={'Barrier'} value={contract.barrier} />}
				<ContractDetailCustom label={'Low Barrier'} value={contract.low_barrier} />
				<ContractDetailCustom label={'High Barrier'} value={contract.high_barrier} />
				<ContractDetailMoney contract={contract} code={'payout'} />
				<ContractDetailMoney contract={contract} code={'buy_price'} />
				<ContractDetailString contract={contract} code={'exit_tick'} />
				<ContractDetailTime contract={contract} code={'exit_tick_time'} />
				{contract.is_forward_starting ? <ContractDetailMoney contract={contract} code="bid_price" /> : null}
				<ContractDetailMoney contract={contract} code={'sell_price'} />
				<ContractDetailTime contract={contract} code={'sell_time'} />
			</div>
		);
	}
}
