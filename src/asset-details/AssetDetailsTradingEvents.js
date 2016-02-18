import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class AssetDetailsTradingEvents extends Component {

	static propTypes = {
		events: PropTypes.array,
	};

	render() {
		const { events } = this.props;

		if (!events) return null;

		return (
			<table>
				<thead>
					<tr>
						<th><M m="Dates" /></th>
						<th><M m="Description" /></th>
					</tr>
				</thead>
				<tbody>
					{events.map((event, i) =>
						<tr key={i}>
							<td>{event.dates}</td>
							<td>{event.descrip}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}
