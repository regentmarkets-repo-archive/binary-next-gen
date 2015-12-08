import React, { PropTypes } from 'react';
import ObjectTableRow from './ObjectTableRow';

const ObjectTable = ({ object }) => (
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{Object.keys(object).map(k => <ObjectTableRow key={k} name={k} value={object[k]}/>)}
		</tbody>
	</table>
);

ObjectTable.propTypes = {
	object: PropTypes.object,
};
export default ObjectTable;
