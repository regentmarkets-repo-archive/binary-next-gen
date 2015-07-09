import React from 'react';

class ObjectTableRow extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.value}</td>
			</tr>
		);
	}
}

export default class ObjectTable extends React.Component {

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
