import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import LabeledEntry from '../_common/LabeledEntry';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		nowEpoch: PropTypes.number,
		transactionId: PropTypes.number,
		actions: PropTypes.object,
	};

	render() {
		const { contract, actions } = this.props;
		const sold = !!contract.sell_price;
		const workAroundForBackendBugIsDigitTrade = contract.shortcode && contract.shortcode.includes('DIGIT');
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;
		const validationError = contract.validation_error;
		const potentialProfit = (contract.payout - contract.buy_price).toFixed(2);
		const profit = sold && (contract.sell_price - contract.buy_price).toFixed(2);
		return (
			<div>
				<LabeledEntry label="Entry Price" value={contract.buy_price} currency={contract.currency} />
				<LabeledEntry
					label="Exit Price"
					value={sold ? contract.sell_price : '-'}
					currency={contract.currency}
				/>
				<LabeledEntry
					label="Indicative Price"
					value={contract.bid_price}
					currency={contract.currency}
					isProfit={v => v - contract.buy_price}
				/>
				<LabeledEntry
					label={sold ? 'Profit' : 'Potential Profit'}
					value={sold ? profit : potentialProfit}
					currency={contract.currency}
					isProfit={v => v}
				/>
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
