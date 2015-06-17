import React from "react";
import moment from "moment";

import Sparkline from 'react-sparkline';

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
				<td>{moment(tick.epoch).format("h:mm:ss a")}</td>
				<td>{tick.diff.toFixed(2)}</td>
				<td><Sparkline data={history.map((h) => h.quote)} /></td>
			</tr>
		);
	}
}
