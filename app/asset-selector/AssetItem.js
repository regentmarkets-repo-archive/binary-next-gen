import React from 'react';

const AssetItem = (props) => (
	<tr>
		<td>
			{props.asset.symbol}
		</td>
		<td>
			{props.asset.display_name}
		</td>
	</tr>
);

AssetItem.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

export default AssetItem;
