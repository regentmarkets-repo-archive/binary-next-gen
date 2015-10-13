import React from 'react';
import { NumberPlain } from '../common';

export default (props) => {
	const balances = props.account.toJS().balances;

 	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Login</th>
						<th>Curency</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					{balances.map(b => (
						<tr>
							<td>{b.loginid}</td>
							<td>{b.currency}</td>
							<td><NumberPlain value={b.balance} /></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
