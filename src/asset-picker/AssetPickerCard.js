import React, { PropTypes } from 'react';
import AssetPickerFilter from './AssetPickerFilter';
import AssetPickerList from './AssetPickerList';

export default class AssetPickerCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		history: PropTypes.object,
		symbolIds: PropTypes.array.isRequired,
		location: PropTypes.object,
		maxTradeId: PropTypes.number.isRequired,
		params: PropTypes.object,
		shownAssets: PropTypes.array.isRequired,
		workspace: PropTypes.object.isRequired,
		watchlist: PropTypes.array.isRequired,
	};

	static defaultProps = {
		params: { id: '-' },
		location: { query: {} },
	};

	onCreateTrade(asset) {
		const { actions, maxTradeId } = this.props;
		actions.initTrade(maxTradeId.toString(), asset);
		actions.getTradingOptions(asset);
		actions.getTicksBySymbol(asset);
	}

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
		const { actions, shownAssets, watchlist, params } = this.props;

		return (
			<div className="asset-picker-container">
				<AssetPickerFilter actions={actions} />
				<div className="asset-list">
					<AssetPickerList
						assets={shownAssets}
						favorites={watchlist}
						onCreateTrade={::this.onCreateTrade}
						onSelect={asset => this.onSelect(params.id, asset)}
						onFavor={::this.onFavor}
						onUnfavor={::this.onUnfavor}
					/>
				</div>
			</div>
		);
	}
}
