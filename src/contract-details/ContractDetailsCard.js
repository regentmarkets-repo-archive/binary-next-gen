import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';
import FlexList from '../containers/FlexList';
import KeyValueColumn from '../_common/KeyValueColumn';
import toMoney from 'binary-utils/lib/toMoney';
import epochToDate from 'binary-utils/lib/epochToDate';
import dateToGMTString from 'binary-utils/lib/dateToGMTString';
import contractCodeToText from 'binary-utils/lib/contractCodeToText';

const epochToGMTString = epoch => dateToGMTString(epochToDate(epoch));

const ContractDetailsDate = ({ contract, code }) => (
	<KeyValueColumn
		label={contractCodeToText(code)}
		value={contract[code] ? epochToGMTString(contract[code]) : '-'}
	/>
);

const ContractDetailsMoney = ({ contract, code }) => (
	<KeyValueColumn
		label={contractCodeToText(code)}
		value={contract[code] || '-'}
		currency={contract.currency}
	/>
);

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		nowEpoch: PropTypes.number,
		className: PropTypes.string,
		transactionId: PropTypes.number,
		actions: PropTypes.object,
	};

	render() {
		const { contract, actions, className } = this.props;
		const sold = !!contract.sell_price;
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;
		const validationError = contract.validation_error;
		const potentialProfit = toMoney(contract.payout - contract.buy_price);
		const profit = sold && toMoney(contract.sell_price - contract.buy_price);

		return (
			<div className={className}>
				{contract.transaction_ids && <M className="ref-id" m={`Ref. no. ${contract.transaction_ids.buy}`} />}
				<FlexList>
					<ContractDetailsDate contract={contract} code={'purchase_time'} />
					<ContractDetailsDate contract={contract} code={'date_start'} />
					<ContractDetailsDate contract={contract} code={'date_expiry'} />
					<ContractDetailsDate contract={contract} code={'sell_time'} />

					<ContractDetailsMoney contract={contract} code={'entry_tick'} />
					<ContractDetailsMoney contract={contract} code={'exit_tick'} />
					<ContractDetailsMoney contract={contract} code={'buy_price'} />
					{sold ? <ContractDetailsMoney contract={contract} code={'sell_price'} /> : null}
					{/* <ContractDetailsMoney contract={contract} code={'bid_price'} /> */}

					<KeyValueColumn
						label="Indicative Price"
						value={contract.bid_price || '-'}
						currency={contract.currency}
						isProfit={v => v - contract.buy_price}
					/>
					<KeyValueColumn
						label={sold ? 'Profit' : 'Potential Profit'}
						value={sold ? profit : potentialProfit}
						currency={contract.currency}
						isProfit={v => v}
					/>
				</FlexList>
				<button
					className="sell-at-market-btn"
					disabled={contract.selling || !validToSell}
					onClick={() => actions.sellContract(contract.contract_id, 0)}
				>
					<M m="Sell at Market" />
					{validToSell &&
						<NumberPlain
							value={contract.bid_price}
							currency={contract.currency}
							isProfit={v => v - contract.buy_price}
						/>}
				</button>
				<div>
				{validationError &&
					(validationError.message ?
						validationError.message.split(')')[1] :
					validationError)
				}
				</div>
				{sold &&
					<label id="profit-loss-label">
						{profit >= 0 ? <M m="You won " /> : <M m="You lost " />}
						{profit >= 0 ?
							<NumberColored
								value={profit}
								currency={contract.currency}
								isProfit={v => v}
							/> :
							<NumberColored
								value={-profit}
								currency={contract.currency}
								isProfit={v => -v}
							/>
						}
					</label>
				}
			</div>
		);
	}
}
