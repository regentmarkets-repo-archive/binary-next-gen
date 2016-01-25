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
			{Object.keys(asset).map((key, idx) =>
				<tr key={idx}>
					<td>{key}</td>
					<td>{asset[key]}</td>
				</tr>
			)}
		</tbody>
	</table>
);


AssetDetailsTable.propTypes = {
	asset: PropTypes.object.isRequired,
};

export default AssetDetailsTable;
