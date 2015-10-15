import React from 'react';
import AssetItem from './AssetItem';

const AssetList = (props) => (
	<table className="asset-list">
		<thead>
			<tr>
				<th></th>
				<th>Asset</th>
				<th>Market</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{props.assets.map(asset =>
				<AssetItem
					key={asset.get('symbol')}
					asset={asset}
					isFavorite={props.favorites.has(asset.get('symbol'))}
					{...props} />
			)}
		</tbody>
	</table>
);

AssetList.propTypes = {
	assets: React.PropTypes.object.isRequired,
};

export default AssetList;
