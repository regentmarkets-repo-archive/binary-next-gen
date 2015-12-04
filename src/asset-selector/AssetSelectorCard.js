import React from 'react';
import AssetSelectorList from './AssetSelectorList';
import { MarketSelector, InputGroup } from '../_common';
// import * as LiveData from '../_data/LiveData';

const AssetSelectorCard = ({actions, assets, assetSelector, history, workspace}) => {
	// const showOnlyTickTradable = !!~window.location.search.indexOf('tick');
	const showOnlyTickTradable = true;
	const shownAssets = assetSelector.get('shownAssets');
	const searchableAssets = assets.get('list').filter(x =>
		!showOnlyTickTradable ||
		x.get('market_display_name') === 'Forex' ||
		x.get('market_display_name') === 'Randoms'
	);

	const onSelect = (newAsset) => {
		const oldAsset = workspace.get('symbolSelected');
		actions.selectAssetSymbolForTrade(newAsset, oldAsset);
		if (~window.location.search.indexOf('goback')) history.goBack();
		if (~window.location.search.indexOf('tick')) {
			// LiveData.api.getTickHistory(newAsset, { end: 'latest', count: 20 });
			// LiveData.api.subscribeToTick(newAsset);
		}
	};
	const onFavor = asset => actions.addToWatchlist(asset);
	const onUnfavor = asset => actions.delFromWatchlist(asset);
	const onSearchQueryChange = e => actions.updateAssetSelectorSearchQuery(searchableAssets, e.target.value);
	const onSubmarketChange = e => actions.updateAssetSelectorSubmarket(searchableAssets, e);

	return (
		<div className="asset-selector-container">
			<fieldset>
				<MarketSelector
					onChange={onSubmarketChange}
					showAllOption
					showMarkets={showOnlyTickTradable ? ['Forex', 'Randoms'] : null} />
				<InputGroup
					className="asset-search"
					type="search"
					placeholder="Search for assets"
					onChange={onSearchQueryChange} />
			</fieldset>
			<div className="asset-list">
				<AssetSelectorList
					assets={shownAssets}
					favorites={workspace.get('favoriteAssets')}
					onSelect={onSelect}
					onFavor={onFavor}
					onUnfavor={onUnfavor}
					selectedAsset={workspace.get('symbolSelected')} />
			</div>
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
