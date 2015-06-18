import React from "react";

export default class SymbolList extends React.Component {

	render() {

		let symbols = this.props.symbols;

		console.log('symbols', symbols);

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
					{JSON.stringify(symbols)}
				</tbody>
			</table>
		);
	}
}
