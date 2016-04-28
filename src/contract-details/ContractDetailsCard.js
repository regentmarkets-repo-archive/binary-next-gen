import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';
import FlexList from '../containers/FlexList';
import KeyValueColumn from '../_common/KeyValueColumn';
import toMoney from 'binary-utils/lib/toMoney';
import epochToDateTime from 'binary-utils/lib/epochToDateTimeString';

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
		const workAroundForBackendBugIsDigitTrade = contract.shortcode && contract.shortcode.includes('DIGIT');
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;
		const validationError = contract.validation_error;
		const potentialProfit = toMoney(contract.payout - contract.buy_price);
		const profit = sold && toMoney(contract.sell_price - contract.buy_price);
		return (
			<div className={className}>
				<M className="ref-id" m={`Ref. no. ${contract.contract_id}`} />
				<FlexList>
					<KeyValueColumn
						label="Purchase time"
						value={contract.purchase_time ? epochToDateTime(contract.date_start) : '-'}
					/>
					<KeyValueColumn
						label="Start time"
						value={contract.date_start ? epochToDateTime(contract.date_start) : '-'}
					/>
					<KeyValueColumn
						label="Exit Time"
						value={contract.date_expiry ? epochToDateTime(contract.date_expiry) : '-'}
					/>
					<KeyValueColumn
						label="Sell Time"
						value={contract.sell_time ? epochToDateTime(contract.date_expiry) : '-'}
					/>
				</FlexList>
				<FlexList>
					<KeyValueColumn
						label="Entry Spot"
						value={contract.entry_tick || '-'}
					/>
					<KeyValueColumn
						label="Exit Spot"
						value={contract.exit_tick || '-'}
					/>
				</FlexList>
				<FlexList>
					<KeyValueColumn
						label="Entry Price"
						value={contract.buy_price || '-'}
						currency={contract.currency}
					/>
					<KeyValueColumn
						label="Exit Price"
						value={sold ? contract.sell_price : '-'}
						currency={contract.currency}
					/>
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
				{validToSell && !workAroundForBackendBugIsDigitTrade ?
					<button
						className="sell-at-market-btn"
						disabled={contract.selling}
						onClick={() => actions.sellContract(contract.contract_id, 0)}
					>
						<M m="Sell at Market" /> (<NumberPlain
							value={contract.bid_price}
							currency={contract.currency}
							isProfit={v => v - contract.buy_price}
						/>)
					</button> :
					<div>
					{validationError &&
						(validationError.message ?
							validationError.message.split(')')[1] :
						validationError)
					}
					</div>
				}
				{
					sold &&
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
