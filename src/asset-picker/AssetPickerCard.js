import React, { PropTypes, Component } from 'react';
import AssetPickerFilter from './AssetPickerFilter';
import AssetPickerList from './AssetPickerList';
import M from 'binary-components/lib/M';

export default class AssetPickerCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		index: PropTypes.number.isRequired,
		compact: PropTypes.bool,
		history: PropTypes.object,
		filter: PropTypes.object,
		assetPickerItems: PropTypes.object.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	onSelect = newAsset => {
		const { index, actions } = this.props;

		actions.changeSelectedAsset(newAsset);
		actions.updateTradeUIState(index, 'disabled', true);
		actions.getTradingOptions(newAsset).then(() => {
			actions.updateTradeParams(index, 'symbol', newAsset);
			actions.updateTradeUIState(index, 'disabled', false);
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
				<AssetPickerList
					{...this.props}
					assets={assetPickerItems}
					selectedAsset={selectedAsset}
					onSelect={this.onSelect}
					onToggleWatchlistItem={this.onToggleWatchlistItem}
				/>
				{Object.keys(assetPickerItems).length > 0 ? null :
					<div className="centerer">
						<M m="Your search didn't match any assets" />
					</div>
				}
			</div>
		);
	}
}
