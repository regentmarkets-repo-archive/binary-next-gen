import React from 'react';

const ObjectTableRow = (props) => (
	<tr>
		<td>{props.name}</td>
		<td>{props.value}</td>
	</tr>
);

ObjectTableRow.propTypes = {
    name: React.PropTypes.string,
	value: React.PropTypes.any,
};

export default ObjectTableRow;
