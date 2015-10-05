import React from 'react';
import AssetItem from './AssetItem';

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
				<AssetItem key={asset.symbol} asset={asset} />
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
