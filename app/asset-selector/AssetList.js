import React from 'react';
import AssetItem from './AssetItem';

export default class AssetList extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		favorites: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.assets !== this.props.assets ||
			nextProps.favorites !== this.props.favorites;
	}

	render() {
		const {assets, favorites} = this.props;

		return (
			<table className="asset-list">
				<thead>
					<tr>
						<th></th>
						<th>Asset</th>
						<th>Market</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{assets.map(asset =>
						<AssetItem
							key={asset.get('symbol')}
							asset={asset}
							isFavorite={favorites.has(asset.get('symbol'))}
							{...this.props} />
					)}
				</tbody>
			</table>
		);
	}
}
