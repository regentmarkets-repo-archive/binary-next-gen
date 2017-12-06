import React, { PureComponent } from 'react';
import { M, CloseButton } from 'binary-components';
import { actions } from '../_store';
import AssetPickerFilter from './AssetPickerFilter';
import AssetPickerList from './AssetPickerList';

export default class AssetPickerCard extends PureComponent {

	props: {
		filter: Object,
		assetPickerItems: Object[],
		selectedAsset: string,
		onSelect: () => void,
		onClose: () => void,
	};

	onToggleWatchlistItem = asset => {
		actions.watchlistToggleAsset(asset.symbol, !asset.isInWatchlist);
	}

	render() {
		const { assetPickerItems, selectedAsset, filter, onSelect, onClose } = this.props;

		return (
			<div className="asset-picker-container">
				<div className="asset-picker-back-button react-material-design-icon">
                    <CloseButton onClick={onClose} />
				</div>
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
