import React, { PropTypes, Component } from 'react';
import AssetPickerFilter from './AssetPickerFilter';
import AssetPickerList from './AssetPickerList';
import M from 'binary-components/lib/M';

export default class AssetPickerCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		tradeIdx: PropTypes.number.isRequired,
		compact: PropTypes.bool,
		history: PropTypes.object,
		filter: PropTypes.object,
		assetPickerItems: PropTypes.object.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	onSelect = newAsset => {
		const { tradeIdx, actions } = this.props;

		actions.changeSelectedAsset(newAsset);
		actions.updateTradeUIState(tradeIdx, 'disabled', true);
		actions.getTradingOptions(newAsset).then(() => {
			actions.updateTradeParams(tradeIdx, 'symbol', newAsset);
			actions.updateTradeUIState(tradeIdx, 'disabled', false);
			actions.getTicksBySymbol(newAsset);
		});
	}

	onToggleWatchlistItem = asset => {
		const { actions } = this.props;
		actions.watchlistToggleAsset(asset.symbol, !asset.isInWatchlist);
	}

	render() {
		const { actions, assetPickerItems, selectedAsset, filter, compact } = this.props;

		return (
			<div className="asset-picker-container">
				<AssetPickerFilter actions={actions} compact={compact} filter={filter} />
				<div className="asset-list">
					<AssetPickerList
						{...this.props}
						assets={assetPickerItems}
						selectedAsset={selectedAsset}
						onSelect={this.onSelect}
						onToggleWatchlistItem={this.onToggleWatchlistItem}
					/>
				</div>
				{Object.keys(assetPickerItems).length > 0 ? null :
					<div className="centerer">
						<M m="Your search didn't match any assets" />
					</div>
				}
			</div>
		);
	}
}
