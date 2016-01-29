import React, { PropTypes } from 'react';
import AssetPickerList from './AssetPickerList';
import { MarketPicker, InputGroup } from '../_common';

export default class AssetPickerCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		shownAssets: PropTypes.array.isRequired,
		idSymbolMap: PropTypes.array.isRequired,
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
			const oldAsset = workspace.symbolSelected;
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
		const { actions, shownAssets, watchlist, idSymbolMap } = this.props;
		const { id } = this.props.params;
		const { query } = this.props.location;
		// const type = query.type;

		const selectedSymbol = idSymbolMap[id];

		const onSearchQueryChange = e => actions.updateAssetPickerSearchQuery(e.target.value);
		const onSubmarketChange = e => actions.updateAssetPickerSubmarket(e);

		const showOnlyTickTradable = false;

		return (
			<div className="asset-picker-container">
				<fieldset>
					<MarketPicker
						onChange={onSubmarketChange}
						allOptionShown
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
