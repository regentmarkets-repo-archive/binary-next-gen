import React from 'react';
import ObjectTableRow from './ObjectTableRow';

const ObjectTable = (props) => (
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{Object.keys(props.object).map((k, i ) => <ObjectTableRow key={i} name={k} value={props.object[k]}/>)}
		</tbody>
	</table>
);

ObjectTable.propTypes = {
	object: React.PropTypes.object,
};
export default ObjectTable;
