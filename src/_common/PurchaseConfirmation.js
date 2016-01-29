import React, { PropTypes } from 'react';
import { FormattedTime } from 'react-intl';
import { epochToDate } from '../_utils/DateUtils';
import { M } from '../_common';

const PurchaseConfirmation = ({ receipt }) => (
	<div>
		<table>
			<tbody>
				<tr>
					<td colSpan="2">
						{receipt.longcode}
					</td>
				</tr>
				<tr>
					<td><M m="Purchase Price" /></td>
					<td>{receipt.buy_price}</td>
				</tr>
				<tr>
					<td><M m="Purchase Time" /></td>
				<td>
					<FormattedTime value={epochToDate(receipt.purchase_time)} format="full" />
				</td>
				</tr>
				<tr>
					<td><M m="Balance" /></td>
					<td>{receipt.balance_after}</td>
				</tr>
			</tbody>
		</table>
		<br/>
		<button><M m="Back" /></button>
	</div>
);

PurchaseConfirmation.propTypes = {
	proposal: PropTypes.object,
};

export default PurchaseConfirmation;
