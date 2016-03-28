import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		nowEpoch: PropTypes.number,
		transactionId: PropTypes.number,
		actions: PropTypes.object,
		durationUnit: PropTypes.string,
	};

	render() {
		const { contract, actions, durationUnit } = this.props;
		const sold = !!contract.sell_price;
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;
		const validationError = contract.validation_error;
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th><M m="Entry Price" /></th>
							<th><M m="Exit Price" /></th>
							<th>{sold ? <M m="Profit" /> : <M m="Potential Profit" />}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><NumberPlain value={contract.buy_price} currency={contract.currency} /></td>
							<td>
								{sold ?
									<NumberPlain value={contract.sell_price} currency={contract.currency} /> :
									'-'}
							</td>
							<td>
								<NumberColored
									value={sold ?
										contract.sell_price - contract.buy_price :
										contract.payout - contract.buy_price
										}
									currency={contract.currency}
									isProfit={v => v}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				{(durationUnit !== 't') && (
					(validToSell && !validationError) ?
						<button
							className="sell-at-market-btn"
							onClick={() => actions.sellContract(contract.contract_id, 0)}
						>
							Sell at Market (<NumberPlain
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
					</div>)
				}
			</div>
		);
	}
}
