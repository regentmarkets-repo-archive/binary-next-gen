import React, { PropTypes } from 'react';
import AssetPickerList from './AssetPickerList';
import { MarketPicker, InputGroup } from '../_common';

export default class AssetPickerCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		assetPicker: PropTypes.object.isRequired,
		idSymbolMap: PropTypes.object.isRequired,
		history: PropTypes.object,
		params: PropTypes.object,
		location: PropTypes.object,
		workspace: PropTypes.object.isRequired,
		watchlist: PropTypes.object.isRequired,
	};

	static defaultProps = {
		params: { id: '-' },
		location: { query: {} },
	};

	onSelect(id, newAsset) {
		const { actions, history, workspace } = this.props;
		actions.getTicksBySymbol(newAsset);			// TODO: unsubscribe extra symbol ticks
		if (id !== '-') {
			actions.updateTradeParams(id, 'symbol', newAsset);
			actions.updatePriceProposalSubscription(id);
			actions.getTradingOptions(newAsset);
			history.goBack();
		} else {
			const oldAsset = workspace.get('symbolSelected');
			actions.selectAssetSymbolForTrade(newAsset, oldAsset);
			actions.getTradingOptions(newAsset);
		}
	}

	onFavor(asset) {
		const { actions } = this.props;
		actions.watchlistFavorAsset(asset);
	}

	onUnfavor(asset) {
		const { actions } = this.props;
		actions.watchlistUnfavorAsset(asset);
	}

	render() {
		const { actions, assets, assetPicker, watchlist, idSymbolMap } = this.props;
		const { id } = this.props.params;
		const { query } = this.props.location;
		const type = query.type;
		// const showOnlyTickTradable = !!~window.location.search.indexOf('tick');
		const showOnlyTickTradable = type === 'tick';
		const shownAssets = assetPicker.get('shownAssets');
		const searchableAssets = assets.filter(x =>
			!showOnlyTickTradable ||
			x.get('market_display_name') === 'Forex' ||
			x.get('market_display_name') === 'Randoms'
		);

		const selectedSymbol = idSymbolMap[id];

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
						onSelect={asset => this.onSelect(id, asset)}
						onFavor={::this.onFavor}
						onUnfavor={::this.onUnfavor}
						selectedAsset={selectedSymbol}
					/>
				</div>
			</div>
		);
	}
}
