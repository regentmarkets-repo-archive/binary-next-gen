import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import AssetSelectorItem from './AssetSelectorItem';

export default class AssetSelectorList extends React.Component {

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
						<AssetSelectorItem
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
