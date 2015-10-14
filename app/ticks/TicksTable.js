import React from 'react';
import TicksRow from './TicksRow';

const TicksTable = ({ticks}) => {
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
					<TicksRow
						key={symbol}
						symbol={symbol}
						history={ticks.get(symbol).toJS()} />
				)}
			</tbody>
		</table>
	);
};

TicksTable.propTypes = {
	ticks: React.PropTypes.object.isRequired,
};

export default TicksTable;
