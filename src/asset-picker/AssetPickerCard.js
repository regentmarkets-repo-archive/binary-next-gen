import React, { PropTypes, Component } from 'react';
import AssetPickerFilter from './AssetPickerFilter';
import AssetPickerList from './AssetPickerList';
import M from '../_common/M';

export default class AssetPickerCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		activeTradeIdx: PropTypes.number.isRequired,
		compact: PropTypes.bool,
		history: PropTypes.object,
		filter: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		assetPickerItems: PropTypes.array.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	static defaultProps = {
		params: { id: '-' },
		location: { query: {} },
	};

	onCreateTrade(asset) {
		const { actions } = this.props;
		actions.createTrade(asset);
		actions.getTradingOptions(asset);
		actions.getTicksBySymbol(asset);
	}

	onSelect(id, newAsset) {
		const { activeTradeIdx, actions, history, selectedAsset } = this.props;

		if (id !== '-') {
			actions.getTicksBySymbol(newAsset);			// TODO: unsubscribe extra symbol ticks
			actions.updateTradeParams(id, 'symbol', newAsset);
			actions.updatePriceProposalSubscription(id);
			actions.getTradingOptions(newAsset);
			history.goBack();
		} else {
			actions.selectAssetSymbolForTrade(newAsset, selectedAsset);
			actions.getTradingOptions(newAsset);
			actions.updateTradeParams(activeTradeIdx, 'symbol', newAsset);
			actions.updatePriceProposalSubscription(activeTradeIdx);
		}
	}

	onToggleWatchlistItem(asset) {
		const { actions } = this.props;
		actions.watchlistToggleAsset(asset.symbol, !asset.isInWatchlist);
	}

	render() {
		const { actions, assetPickerItems, selectedAsset, params, filter } = this.props;

		return (
			<div className="asset-picker-container">
				<AssetPickerFilter actions={actions} filter={filter} />
				<div className="asset-list">
					<AssetPickerList
						grouped
						assets={assetPickerItems}
						selectedAsset={selectedAsset}
						onCreateTrade={::this.onCreateTrade}
						onSelect={asset => this.onSelect(params.id, asset)}
						onToggleWatchlistItem={::this.onToggleWatchlistItem}
					/>
				</div>
				{assetPickerItems.length > 0 ? null :
					<div className="centerer">
						<M m="Your search didn't match any assets" />
					</div>
				}
			</div>
		);
	}
}
