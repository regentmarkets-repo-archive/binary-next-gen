import React, { PropTypes } from 'react';
import AssetPickerItem from './AssetPickerItem';

export default class AssetPickerList extends React.Component {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		compact: PropTypes.bool,
		favorites: PropTypes.array.isRequired,
	};

	render() {
		const { assets, favorites } = this.props;

		return (
			<table>
				<tbody>
					{assets.map(asset =>
						<AssetPickerItem
							key={asset.symbol}
							asset={asset}
							isFavorite={favorites[asset.symbol]}
							{...this.props}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
