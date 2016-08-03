import React, { PropTypes, PureComponent } from 'react';
import { Th } from 'binary-components';

export default class AssetDetailsDurations extends PureComponent {

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
						<Th className="textual" text="Trade Type" />
						<Th className="textual" text="Durations" />
					</tr>
				</thead>
				<tbody>
					{durations[2].map((x, i) =>
						<tr key={i}>
							<td className="textual">{x[1]}</td>
							<td className="textual">{x[2]} &ndash; {x[3]}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}
