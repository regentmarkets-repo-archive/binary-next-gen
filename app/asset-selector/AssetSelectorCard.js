import React from 'react';
import AssetList from './AssetList';
import { MarketSelector, InputGroup } from '../common';

const AssetSelectorCard = ({actions, assets, assetSelector, history, workspace}) => {
	const shownAssets = assetSelector.get('shownAssets');

	const onSelect = (asset) => {
		actions.workspaceAssetSelect(asset);
		if (~window.location.search.indexOf('goback')) history.goBack();
	};
	const onFavor = asset => actions.workspaceFavorAsset(asset);
	const onSearchQueryChange = e => actions.updateAssetSelectorSearchQuery(assets.get('list'), e.target.value);
	const onSubmarketChange = e => actions.updateAssetSelectorSubmarket(assets.get('list'), e);

	return (
		<div>
			<MarketSelector
				onChange={onSubmarketChange}
				showAllOption={true} />
			<InputGroup
				className="asset-search"
				type="search"
				placeholder="Search for assets"
				onChange={onSearchQueryChange} />
			<AssetList
				assets={shownAssets}
				favorites={workspace.get('favoriteAssets')}
				onSelect={onSelect}
				onFavor={onFavor} />
		</div>
	);
};

AssetSelectorCard.propTypes = {
	actions: React.PropTypes.object.isRequired,
    assets: React.PropTypes.object.isRequired,
	assetSelector: React.PropTypes.object.isRequired,
	workspace: React.PropTypes.object.isRequired,
};

export default AssetSelectorCard;
