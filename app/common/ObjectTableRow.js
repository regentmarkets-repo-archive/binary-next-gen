import React from 'react';

export default class ObjectTableRow {

	static propTypes = {
        name: React.PropTypes.string,
		value: React.PropTypes.object,
    };

	render() {
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.value}</td>
			</tr>
		);
	}
}
