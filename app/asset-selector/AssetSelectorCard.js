import React from 'react';
import AssetSelectorList from './AssetSelectorList';
import { MarketSelector, InputGroup } from '../_common';
import LiveData from '../_data/LiveData';

const AssetSelectorCard = ({actions, assets, assetSelector, history, workspace}) => {
	const shownAssets = assetSelector.get('shownAssets');

	const onSelect = (asset) => {
		actions.workspaceAssetSelect(asset);
		if (~window.location.search.indexOf('goback')) history.goBack();
		if (~window.location.search.indexOf('tick')) {
			const liveData = new LiveData();
			liveData.api.getTickHistory(asset, { end: 'latest', count: 20 });
			liveData.api.subscribeToTick(asset);
		}
	};
	const onFavor = asset => actions.workspaceFavorAsset(asset);
	const onSearchQueryChange = e => actions.updateAssetSelectorSearchQuery(assets.get('list'), e.target.value);
	const onSubmarketChange = e => actions.updateAssetSelectorSubmarket(assets.get('list'), e);

	return (
		<div>
			<MarketSelector
				onChange={onSubmarketChange}
				showAllOption={true}
				showMarkets={~window.location.search.indexOf('tick') ? ['Forex', 'Randoms'] : null} />
			<InputGroup
				className="asset-search"
				type="search"
				placeholder="Search for assets"
				onChange={onSearchQueryChange} />
			<AssetSelectorList
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
