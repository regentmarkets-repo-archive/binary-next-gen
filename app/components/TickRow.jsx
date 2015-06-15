import React from "react";

export default class TickTable extends React.Component {

	static propTypes = {
		ticks: React.PropTypes.string.isRequired,
		quote: React.PropTypes.number.isRequired,
		epoch: React.PropTypes.string.isRequired
	};

	render() {
		let { ticks, quote, epoch } = this.props;
		return (
			<tr>
				<td>{ticks}</td>
				<td>{quote}</td>
				<td>{epoch}</td>
			</tr>
		);
	}
}
