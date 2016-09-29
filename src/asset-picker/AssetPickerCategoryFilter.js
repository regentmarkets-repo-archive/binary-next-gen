import React, { PureComponent } from 'react';
import { TabList, Tab } from 'binary-components';
import FavoritesIcon from '-!babel!svg-react!../../www/img/favorites.svg';

const values = [
	'all',
	'favorites',
	'open',
	'volidx',
	'forex',
	'indices',
	'commodities',
	'stocks',
];

export default class AssetPickerCategoryFilter extends PureComponent {

	props: {
		onChange: (newIndex: number) => void,
	};

	onChange = num =>
		this.props.onChange(values[num]);

	render() {
		return (
			<TabList onChange={this.onChange}>
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="All" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Favorites" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Open" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Volatility" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Forex" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Indices" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Commodities" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="OTC Stocks" />
			</TabList>
		);
	}
}
