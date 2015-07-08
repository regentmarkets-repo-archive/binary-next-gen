import React from 'react';
import ObjectTable from './ObjectTable';


export default class OfferingsList extends React.Component {

	static propTypes = {
		offerings: React.PropTypes.object.isRequired
	};

	render() {

		const offerings = this.props.offerings;

		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Value</th>
						<th>Time</th>
						<th>Change</th>
						<th>Chart</th>
					</tr>
				</thead>
				<tbody>
					<div>
						{ Object.keys(offerings).map((s, i) =>
							<ObjectTable key={i} object={offerings[s]} />
						)}
					</div>
				</tbody>
			</table>
		);
	}
}
