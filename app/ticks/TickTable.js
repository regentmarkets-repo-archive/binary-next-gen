import React from 'react';
import TickRow from './TickRow';

const TickTable = (props) => {
 	const symbols = props.ticks.symbols();

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
				{symbols.map((symbol, i) =>
					<TickRow
						key={i}
						tick={ticks.current(symbol)}
						history={ticks.history(symbol)} />
				)}
			</tbody>
		</table>
	);
};

TickTable.propTypes = {
	ticks: React.PropTypes.object.isRequired,
};

export default TickTable;
