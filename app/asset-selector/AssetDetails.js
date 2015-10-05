import React from 'react';
import AssetItem from './MarketItem';

const AssetList = (props) => (
	<table>
		<thead>
			<tr>
				<th>Code</th>
				<th>Name</th>
			</tr>
		</thead>
		<tbody>
			{props.assets.map(asset =>
				<AssetItemkey={asset.symbol} asset={asset} />
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
