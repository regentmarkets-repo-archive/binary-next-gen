import React from 'react';
import { FormattedDate } from 'react-intl';

const PurchaseConfirmation = ({ receipt }) => (
	<div>
		<table>
			<tbody>
				<tr>
					<td colSpan="2">{receipt.get('longcode')}</td>
				</tr>
				<tr>
					<td>Purchase Price</td>
					<td>{receipt.get('buy_price')}</td>
				</tr>
				<tr>
					<td>Purchase Time</td>
				<td><FormattedDate value={new Date(receipt.get('purchase_time') * 1000)} /></td>
				</tr>
				<tr>
					<td>Balance</td>
					<td>{receipt.get('balance_after')}</td>
				</tr>
			</tbody>
		</table>
		<br/>
		<button>Back</button>
	</div>
);

PurchaseConfirmation.propTypes = {
	proposal: React.PropTypes.object,
};

export default PurchaseConfirmation;
