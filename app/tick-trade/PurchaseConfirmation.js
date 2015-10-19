import React from 'react';

const PurchaseConfirmation = ({receipt}) => (
	<div>
		<table>
			<tbody>
				<tr>
					<td colSpan="2">{receipt.longcode}</td>
				</tr>
				<tr>
					<td>Purchase Price</td>
					<td>{receipt.buy_price}</td>
				</tr>
				<tr>
					<td>Purchase Time</td>
					<td>{receipt.purchise_time}</td>
				</tr>
				<tr>
					<td>Balance</td>
					<td>{receipt.balance_after}</td>
				</tr>
			</tbody>
		</table>
		<button>Back</button>
	</div>
);

PurchaseConfirmation.propTypes = {
	proposal: React.PropTypes.object,
};

export default PurchaseConfirmation;
