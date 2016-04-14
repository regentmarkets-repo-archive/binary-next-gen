import React, { PropTypes, Component } from 'react';
import AssetPickerList from './AssetPickerList';

export default class AssetPickerCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		tradeIdx: PropTypes.number.isRequired,
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
		const { tradeIdx, actions, history, selectedAsset } = this.props;

		if (id !== '-') {
			actions.getTicksBySymbol(newAsset, selectedAsset);			// TODO: unsubscribe extra symbol ticks
			actions.updateTradeParams(id, 'symbol', newAsset);
			actions.updatePriceProposalSubscription(id);
			actions.getTradingOptions(newAsset);
			history.goBack();
		} else {
			actions.clearTradeTicks();
			actions.changeSelectedAsset(newAsset);
			actions.updateTradeParams(activeTradeIdx, 'disabled', true);
			actions.getTradingOptions(newAsset)
				.then(
					() => {
						actions.updateTradeParams(activeTradeIdx, 'symbol', newAsset);
						actions.updateTradeParams(activeTradeIdx, 'disabled', false);
						actions.getTicksBySymbol(newAsset);
					}
				);
		}
	}

	onToggleWatchlistItem(asset) {
		const { actions } = this.props;
		actions.watchlistToggleAsset(asset.symbol, !asset.isInWatchlist);
	}

	render() {
		const { assetPickerItems, selectedAsset, params } = this.props;

		return (
			<div className="asset-picker-container">
				<div className="asset-list">
					<AssetPickerList
						assets={assetPickerItems}
						selectedAsset={selectedAsset}
						onSelect={asset => this.onSelect(params.id, asset)}
					/>
				</div>
			</div>
		);
	}
}
