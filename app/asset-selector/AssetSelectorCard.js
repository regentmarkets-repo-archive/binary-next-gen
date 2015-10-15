import React from 'react';
import { bindActionCreators } from 'redux';
import * as WorkspaceActions from '../_actions/WorkspaceActions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';
import { MarketSubmarketSelector } from '../common';

const AssetSelectorCard = ({assets, dispatch}) => {
	const { shownAssets, tree } = assets.toJS(); // tree, active, shownAssets, query
	const actions = bindActionCreators(WorkspaceActions, dispatch);

	const assetFavored = (asset) => {
		actions.workspaceFavorAsset(asset);
	};

	const assetInfoed = (asset) => {
		actions.workspaceViewAssetDetails(asset);
	};

	return (
		<div>
			<MarketSubmarketSelector tree={tree} />
			<AssetSearch actions={actions} />
			<AssetList
				assets={shownAssets}
				onSelect={(asset) => actions.workspaceAssetSelect(asset)}
				onFavor={assetFavored}
				onInfo={assetInfoed} />
		</div>
	);
};

AssetSelectorCard.propTypes = {
    assets: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default AssetSelectorCard;
