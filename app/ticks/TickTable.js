import React from 'react';
import TickRow from './TickRow';

export default class TickTable extends React.Component {

	static propTypes = {
		tickData: React.PropTypes.object.isRequired
	};

	render() {

		let tickData = this.props.tickData;
		let symbols = tickData.symbols();
		let shownSymbols = symbols.slice(symbols.length - 10);

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
					{shownSymbols.map((symbol, i) =>
						<TickRow
							key={i}
							tick={tickData.current(symbol)}
							history={tickData.history(symbol)} />
					)}
				</tbody>
			</table>
		);
	}
}
