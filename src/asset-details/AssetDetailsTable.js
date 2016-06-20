import React, { PropTypes, Component } from 'react';
import Th from 'binary-components/lib/Th';

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
						<Th text="Property" />
						<Th text="Value" />
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
