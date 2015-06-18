import React from "react";

export default class OfferingsList extends React.Component {

	render() {

		let offerings = this.props.offerings;

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
					{offerings.map((symbol, i) => <TickRow key={i} tick={tickData.current(symbol)} history={tickData.history(symbol)} />)}
				</tbody>
			</table>
		);
	}
}
