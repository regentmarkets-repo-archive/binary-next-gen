import React, { PropTypes } from 'react';

export default class AssetDetailsDurations extends React.Component {

	static propTypes = {
		durations: PropTypes.array.isRequired,
	};

	render() {
		const { durations } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th>Trade Type</th>
						<th>Durations</th>
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
