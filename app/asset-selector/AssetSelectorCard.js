import React from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../_actions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';
import { MarketSubmarketSelector } from '../common';

const AssetSelectorCard = ({assets, workspace, dispatch}) => {
	const { shownAssets, tree } = assets.toJS();
	const actions = bindActionCreators(Actions, dispatch);

	return (
		<div>
			<MarketSubmarketSelector tree={tree} showAllOption={true} />
			<AssetSearch actions={actions} />
			<AssetList
				assets={shownAssets}
				favorites={workspace.get('favoriteAssets')}
				onSelect={asset => actions.workspaceAssetSelect(asset)}
				onFavor={asset => actions.workspaceFavorAsset(asset)} />
		</div>
	);
};

AssetSelectorCard.propTypes = {
    assets: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default AssetSelectorCard;
