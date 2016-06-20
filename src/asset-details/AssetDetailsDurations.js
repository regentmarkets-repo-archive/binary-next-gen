import React, { PropTypes, Component } from 'react';
import Th from 'binary-components/lib/Th';

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
						<Th text="Trade Type" />
						<Th text="Durations" />
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
