import React from 'react';

const AssetDetailsCard = ({asset}) => (
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{Object.keys(asset).map((key) =>
				<tr>
					<td>{key}</td>
					<td>{asset[key]}</td>
				</tr>
			)}
		</tbody>
	</table>
);

AssetDetailsCard.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

AssetDetailsCard.defaultProps = {
	asset: {},
};

export default AssetDetailsCard;
