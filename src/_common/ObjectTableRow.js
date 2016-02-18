import React, { PropTypes, Component } from 'react';

const ObjectTableRow = (props) => (
	<tr>
		<td>{props.name}</td>
		<td>{props.value}</td>
	</tr>
);

ObjectTableRow.propTypes = {
    name: PropTypes.string,
	value: PropTypes.any,
};

export default ObjectTableRow;
