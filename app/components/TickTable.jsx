import React from "react";
import TickRow from "components/TickRow";

export default class TickTable extends React.Component {

	static propTypes = {
		ticks: React.PropTypes.object.isRequired
	};

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Value</th>
						<th>Epoc</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(this.props.ticks).map((tick, i) => <TickRow key={i} {...this.props.ticks[tick]} />)}
				</tbody>
			</table>
		);
	}
}
