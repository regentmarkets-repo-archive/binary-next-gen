import React from 'react';
import { bindActionCreators } from 'redux';
import * as Actions from '../_actions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';
import { MarketSubmarketSelector } from '../common';

const AssetSelectorCard = ({assets, assetSelector, workspace, dispatch}) => {
	const assetTree = assets.get('tree').toJS();
	const shownAssets = assetSelector.get('shownAssets');
	const actions = bindActionCreators(Actions, dispatch);

	const onSelect = asset => actions.workspaceAssetSelect(asset);
	const onFavor = asset => actions.workspaceFavorAsset(asset);
	const onSearchQueryChange = e => actions.filterAssets(assets.get('list'), e.target.value);

	return (
		<div>
			<MarketSubmarketSelector tree={assetTree} showAllOption={true} />
			<AssetSearch onChange={onSearchQueryChange} />
			<AssetList
				assets={shownAssets}
				favorites={workspace.get('favoriteAssets')}
				onSelect={onSelect}
				onFavor={onFavor} />
		</div>
	);
};

AssetSelectorCard.propTypes = {
    assets: React.PropTypes.object.isRequired,
	assetSelector: React.PropTypes.object.isRequired,
	workspace: React.PropTypes.object.isRequired,
	dispatch: React.PropTypes.func,
};

export default AssetSelectorCard;
