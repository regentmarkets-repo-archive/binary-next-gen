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
	};

	render() {
		const { contract, actions } = this.props;
		const sold = !!contract.sell_price;
		const validToSell = contract.is_valid_to_sell === 1 && !contract.is_expired;
		const validationError = contract.validation_error;
		const potentialProfit = contract.payout - contract.buy_price;
		const profit = sold && (contract.sell_price - contract.buy_price);
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th><M m="Entry Price" /></th>
							<th><M m="Exit Price" /></th>
							<th><M m="Indicative Price" /></th>
							<th>{sold ? <M m="Profit" /> : <M m="Potential Profit" />}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{contract.buy_price &&
									<NumberPlain value={contract.buy_price} currency={contract.currency} /> }
							</td>
							<td>
								{sold ?
									<NumberPlain value={contract.sell_price} currency={contract.currency} /> :
									'-'}
							</td>
							<td>
								<NumberColored
									value={contract.bid_price}
									currency={contract.currency}
									isProfit={v => v - contract.buy_price}
								/>
							</td>
							<td>
								{contract.buy_price &&
									<NumberColored
										value={sold ?
											profit :
											potentialProfit
											}
										currency={contract.currency}
										isProfit={v => v}
									/>}
							</td>
						</tr>
					</tbody>
				</table>
				{validToSell ?
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
							{profit >= 0 ? <M m="You have won " /> : <M m="You have lost " />}
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
