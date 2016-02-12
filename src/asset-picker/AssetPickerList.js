import React, { PropTypes } from 'react';
import AssetPickerItem from './AssetPickerItem';
import AssetPickerHeader from './AssetPickerHeader';

export default class AssetPickerList extends React.Component {

	static propTypes = {
		assets: PropTypes.array.isRequired,
		compact: PropTypes.bool,
		grouped: PropTypes.bool,
	};

	render() {
		const { assets, grouped } = this.props;

		let prevMarket = '';
		let prevSubmarket = '';

		return (
			<table>
				{assets.reduce((components, asset) => {
					if (grouped && prevSubmarket !== asset.submarket) {
						components.push(
							<AssetPickerHeader
								key={asset.submarket}
								market={asset.market}
								submarket={asset.submarket}
								showMarket={prevMarket !== asset.market}
							/>
						);
						prevMarket = asset.market;
						prevSubmarket = asset.submarket;
					}
					components.push(
						<tbody key={asset.symbol}>
							<AssetPickerItem
								key={asset.symbol}
								asset={asset}
								{...this.props}
							/>
						</tbody>
					);

					return components;
				}, [])}
			</table>
		);
	}
}
