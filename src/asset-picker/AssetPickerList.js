import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import AssetPickerItem from './AssetPickerItem';

export default class AssetPickerList extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: PropTypes.object.isRequired,
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
							key={asset.get('symbol')}
							asset={asset}
							isFavorite={favorites.has(asset.get('symbol'))}
							isSelected={selectedAsset === asset.get('symbol') ? true : false}
							{...this.props}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
