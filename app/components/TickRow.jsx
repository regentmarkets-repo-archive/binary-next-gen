import React from "react";
import moment from "moment";

export default class TickTable extends React.Component {

	static propTypes = {
		tick: React.PropTypes.object.isRequired,
		history: React.PropTypes.number.isRequired
	};

	render() {
		let { tick, history } = this.props;
		return (
			<tr>
				<td>{tick.symbol}</td>
				<td>{tick.quote}</td>
				<td>{moment.utc(tick.epoch).local()}</td>
				<td>{tick.epoch}</td>
				<td>{tick.diff.toFixed(2)}</td>
			</tr>
		);
	}
}
