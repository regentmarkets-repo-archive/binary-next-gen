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
				<AssetItem key={asset.symbol} asset={asset} {...props} />
			)}
		</tbody>
	</table>
);

AssetList.propTypes = {
	assets: React.PropTypes.array.isRequired,
};

AssetList.defaultProps = {
	assets: [],
};

export default AssetList;
