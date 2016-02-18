import React, { PropTypes, Component } from 'react';
import M from '../_common/M';

export default class AssetDetailsTable extends Component {

	static propTypes = {
		asset: PropTypes.object.isRequired,
	};

	render() {
		const { asset } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th><M m="Property" /></th>
						<th><M m="Value" /></th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(asset).map((key, idx) =>
						<tr key={idx}>
							<td>{key}</td>
							<td>{asset[key]}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}
