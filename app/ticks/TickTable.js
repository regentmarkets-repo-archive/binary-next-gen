import React from 'react';
import TickRow from './TickRow';

export default class TickTable {

	static propTypes = {
		ticks: React.PropTypes.object.isRequired,
	};

	render() {
		const { ticks } = this.props;
	 	const symbols = ticks.symbols();

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
	}
}
