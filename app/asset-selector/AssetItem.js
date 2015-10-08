import React from 'react';

const AssetItem = ({asset}) => (
	<tr>
		<td>
			{asset.symbol}
		</td>
		<td>
			{asset.display_name}
		</td>
	</tr>
);

AssetItem.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

export default AssetItem;
