import React from 'react';

const AssetItem = ({asset}) => (
	<tr>
		<td>
			☆
		</td>
		<td>
			{asset.display_name}
		</td>
		<td>
			{asset.market_display_name + ' > ' + asset.submarket_display_name}
		</td>
	</tr>
);

AssetItem.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

export default AssetItem;
