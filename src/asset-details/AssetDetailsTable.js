import React, { PropTypes } from 'react';
import { M } from '../_common';

const AssetDetailsTable = ({ asset }) => (
	<table>
		<thead>
			<tr>
				<th><M m="Property" /></th>
				<th><M m="Value" /></th>
			</tr>
		</thead>
		<tbody>
			{asset.map((val, key) =>
				<tr>
					<td>{key}</td>
					<td>{val}</td>
				</tr>
			)}
		</tbody>
	</table>
);


AssetDetailsTable.propTypes = {
	asset: PropTypes.object.isRequired,
};

export default AssetDetailsTable;
