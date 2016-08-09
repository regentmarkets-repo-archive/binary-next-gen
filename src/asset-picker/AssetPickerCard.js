import React, { PropTypes, PureComponent } from 'react';
import { M } from 'binary-components';
import { actions } from '../_store';
import AssetPickerFilter from './AssetPickerFilter';
import AssetPickerList from './AssetPickerList';

export default class AssetPickerCard extends PureComponent {

	static propTypes = {
		index: PropTypes.number,
		filter: PropTypes.object,
		onSelecg: PropTypes.func,
		assetPickerItems: PropTypes.object.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	onToggleWatchlistItem = asset => {
		actions.watchlistToggleAsset(asset.symbol, !asset.isInWatchlist);
	}

	render() {
		const { assetPickerItems, selectedAsset, filter, onSelect } = this.props;

		return (
			<div className="asset-picker-container">
				<AssetPickerFilter filter={filter} />
				<AssetPickerList
					{...this.props}
					assets={assetPickerItems}
					selectedAsset={selectedAsset}
					onSelect={onSelect}
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
