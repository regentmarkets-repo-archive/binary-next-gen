import React from 'react';

const AssetItem = (props) => (
	<tr>
		<td>
			{props.asset.id}
		</td>
		<td>
			{props.asset.name}
		</td>
	</tr>
);

AssetItem.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

export default AssetItem;
