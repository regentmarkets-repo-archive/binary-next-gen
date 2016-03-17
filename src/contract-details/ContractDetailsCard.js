import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import NumberPlain from '../_common/NumberPlain';
import NumberColored from '../_common/NumberColored';

export default class ContractDetailsCard extends Component {

	static propTypes = {
		contract: PropTypes.object.isRequired,
		nowEpoch: PropTypes.number,
		soldResultShown: PropTypes.object,
		transactionId: PropTypes.number,
		actions: PropTypes.object,
	};

	render() {
		const { contract, transactionId, actions } = this.props;
		const expired = contract.is_expired === 1;
		const validToSell = contract.is_valid_to_sell === 1 && !expired;
		return (
			<div>
				<h3><M m="Trasaction Reference: {id}" values={{ id: transactionId }} /></h3>
				<table>
					<thead>
						<tr>
							<th><M m="Entry Price" /></th>
							<th><M m="Exit Price" /></th>
							<th>{expired ? <M m="Profit" /> : <M m="Potential Profit" />}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><NumberPlain value={contract.buy_price} currency={contract.currency} /></td>
							<td>
								{expired
									? <NumberPlain value={contract.sell_price} currency={contract.currency} />
									: '-'}
							</td>
							<td>
								<NumberColored
									value={expired ?
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
				<M m="Market Price:" />
				<NumberColored
					value={contract.bid_price}
					currency={contract.currency}
					isProfit={v => v - contract.buy_price}
				/>
				{validToSell ?
					<button onClick={() => actions.sellContract(contract.contract_id, 0)}>
						Sell at market
					</button> :
					<div>{contract.validation_error}</div>
				}
			</div>
		);
	}
}
