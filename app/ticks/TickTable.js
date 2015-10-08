import React from 'react';
import TickRow from './TickRow';

const TickTable = ({ticks}) => {
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
				{ticks.keySeq().map((symbol) =>
					<TickRow
						key={symbol}
						symbol={symbol}
						history={ticks.get(symbol).toJS()} />
				)}
			</tbody>
		</table>
	);
};

TickTable.propTypes = {
	ticks: React.PropTypes.object.isRequired,
};

export default TickTable;
