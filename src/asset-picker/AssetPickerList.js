import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import AssetPickerItem from './AssetPickerItem';

export default class AssetPickerList extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: PropTypes.array.isRequired,
		favorites: PropTypes.object.isRequired,
		selectedAsset: PropTypes.string,
	};

	render() {
		const { assets, favorites, selectedAsset } = this.props;

		return (
			<table>
				<tbody>
					{assets.map(asset =>
						<AssetPickerItem
							key={asset.symbol}
							asset={asset}
							isFavorite={favorites.has(asset.symbol)}
							isSelected={selectedAsset === asset.symbol}
							{...this.props}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
