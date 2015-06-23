import React from "react";
import TickRow from "components/TickRow";

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
						<th>Name</th>
						<th>Value</th>
						<th>Time</th>
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
