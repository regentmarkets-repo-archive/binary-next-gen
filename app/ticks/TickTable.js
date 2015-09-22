import React from 'react';
import TickRow from './TickRow';

const TickTable = (props) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Value</th>
					<th>Updated</th>
					<th>Change</th>
					<th>Chart</th>
				</tr>
			</thead>
			<tbody>
				{props.ticks.keySeq().map((symbol) =>
					<TickRow
						key={symbol}
						symbol={symbol}
						history={props.ticks.get(symbol).toJS()} />
				)}
			</tbody>
		</table>
	);
};

TickTable.propTypes = {
	ticks: React.PropTypes.object.isRequired,
};

export default TickTable;
