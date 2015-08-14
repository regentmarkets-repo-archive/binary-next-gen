import React from 'react';
import ObjectTableRow from './ObjectTableRow';

export default class ObjectTable {

	static propTypes = {
		object: React.PropTypes.object,
	};

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(this.props.object).map((k, i ) => <ObjectTableRow key={i} name={k} value={this.props.object[k]}/>)}
				</tbody>
			</table>
		);
	}
}
