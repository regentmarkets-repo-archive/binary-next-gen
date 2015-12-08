import React, { PropTypes } from 'react';
import ObjectTable from '../_common/ObjectTable';

const OfferingsList = (props) => (
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
				{ Object.keys(props.offerings).map((s, i) =>
					<ObjectTable key={i} object={props.offerings[s]} />
				)}
			</div>
		</tbody>
	</table>
);

OfferingsList.propTypes = {
	offerings: PropTypes.array.isRequired,
};

export default OfferingsList;
