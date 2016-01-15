import React, { PropTypes } from 'react';
import AssetPickerList from './AssetPickerList';
import { MarketPicker, InputGroup } from '../_common';
import * as LiveData from '../_data/LiveData';

export default class AssetPickerCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		AssetPicker: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
		history: PropTypes.object,
		watchlist: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, AssetPicker, history, workspace, watchlist } = this.props;
		// const showOnlyTickTradable = !!~window.location.search.indexOf('tick');
		const showOnlyTickTradable = true;
		const shownAssets = AssetPicker.get('shownAssets');
		const searchableAssets = assets.get('list').filter(x =>
			!showOnlyTickTradable ||
			x.get('market_display_name') === 'Forex' ||
			x.get('market_display_name') === 'Randoms'
		);

		const onSelect = newAsset => {
			const oldAsset = workspace.get('symbolSelected');
			actions.selectAssetSymbolForTrade(newAsset, oldAsset);
			actions.getTradingOptions(newAsset);
			if (~window.location.search.indexOf('goback')) history.goBack();
			if (~window.location.search.indexOf('tick')) {
				LiveData.api.getTickHistory(newAsset, { end: 'latest', count: 20 });
				LiveData.api.subscribeToTick(newAsset);
			}
		};
		const onFavor = asset => actions.watchlistFavorAsset(asset);
		const onUnfavor = asset => actions.watchlistUnfavorAsset(asset);
		const onSearchQueryChange = e => actions.updateAssetPickerSearchQuery(searchableAssets, e.target.value);
		const onSubmarketChange = e => actions.updateAssetPickerSubmarket(searchableAssets, e);

		return (
			<div className="asset-picker-container">
				<fieldset>
					<MarketPicker
						onChange={onSubmarketChange}
						showAllOption
						showMarkets={showOnlyTickTradable ? ['Forex', 'Randoms'] : null}
					/>
					<InputGroup
						className="asset-search"
						type="search"
						placeholder="Search for assets"
						onChange={onSearchQueryChange}
						autoFocus
					/>
				</fieldset>
				<div className="asset-list">
					<AssetPickerList
						assets={shownAssets}
						favorites={watchlist}
						onSelect={onSelect}
						onFavor={onFavor}
						onUnfavor={onUnfavor}
						selectedAsset={workspace.get('symbolSelected')}
					/>
				</div>
			</div>
		);
	}
}
