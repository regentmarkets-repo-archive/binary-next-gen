import React, { PropTypes, Component } from 'react';
import ContractDetailString from './ContractDetailString';
import ContractDetailTime from './ContractDetailTime';
import ContractDetailMoney from './ContractDetailMoney';
import ContractDetailCustom from './ContractDetailCustom';
// import M from '../_common/M';

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
		// const sold = !!contract.sell_price;
		// const potentialProfit = toMoney(contract.payout - contract.buy_price);
		// const profit = sold && toMoney(contract.sell_price - contract.buy_price);

		return (
			<div className="trade-panel-receipt">
				<ContractDetailString contract={contract} code={'contract_id'} />
				<ContractDetailCustom
					label="Reference ID"
					value={transactionIdsToString(contract.transaction_ids)}
				/>
				<ContractDetailTime contract={contract} code={'date_start'} />
				<ContractDetailTime contract={contract} code={'date_expiry'} />
				<ContractDetailCustom label={'Remaining Time'} />
				<ContractDetailString contract={contract} code={'entry_spot'} />
				{/* <ContractDetailMoney contract={contract} code={'buy_price'} /> */}

				{contract.barrier && <ContractDetailCustom label={'Barrier'} value={contract.barrier} />}
				{contract.low_barrier && <ContractDetailCustom label={'Barrier'} value={contract.low_barrier} />}
				{contract.high_barrier && <ContractDetailCustom label={'Barrier'} value={contract.high_barrier} />}

				<ContractDetailCustom label={'Purchase Price'} />

				<ContractDetailString contract={contract} code={'exit_tick'} />
				<ContractDetailTime contract={contract} code={'exit_tick_time'} />
				Exit Spot Time
				Price
				Profit/Loss

				{contract.is_forward_starting ? <ContractDetailMoney contract={contract} code="bid_price" /> : null}

				<ContractDetailMoney contract={contract} code={'sell_price'} />
				<ContractDetailMoney contract={contract} code={'sell_time'} />
				<ContractDetailString contract={contract} code={'sell_spot'} />

				<ContractDetailTime contract={contract} code={'entry_tick_time'} />
				<ContractDetailString contract={contract} code={'entry_tick'} />


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
