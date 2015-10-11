import React from 'react';
import { MarketSelector } from '../common';
import AssetIndexTable from './AssetIndexTable';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const AssetIndexPane = ({assets, params}) => {
	const { tree, list } = assets.toJS(); // tree, active, shownAssets, query
	const marketName = (params.market && capitalize(params.market)) || 'Forex';
	const submarkets = Object.keys(tree[marketName] || []);

	return (
		<div>
			<MarketSelector markets={Object.keys(tree)} selected={params.market} prefixRoute="/asset-index/" />
			{submarkets.map(submarket =>
				<AssetIndexTable key={submarket} submarket={submarket} assets={list.filter(a => a.submarket_display_name === submarket)} />
			)}
		</div>
	);
};

AssetIndexPane.propTypes = {
	assets: React.PropTypes.object.isRequired,
	params: React.PropTypes.object.isRequired,
};

export default AssetIndexPane;
