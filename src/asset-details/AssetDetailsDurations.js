import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class AssetDetailsDurations extends Component {

	static propTypes = {
		durations: PropTypes.array,
	};

	render() {
		const { durations } = this.props;

		if (!durations) return null;

		return (
			<table>
				<thead>
					<tr>
						<th><M m="Trade Type" /></th>
						<th><M m="Durations" /></th>
					</tr>
				</thead>
				<tbody>
					{durations[2].map((x, i) =>
						<tr key={i}>
							<td>{x[1]}</td>
							<td>{x[2]} &ndash; {x[3]}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}
