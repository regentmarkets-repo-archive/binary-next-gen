import React, { PureComponent } from 'react';
import { TabList, Tab } from 'binary-components';
import AllIcon from '../../www/img/all.svg';
import FavoritesIcon from '../../www/img/favorites.svg';
import OpenIcon from '../../www/img/open.svg';
import VolatilityIcon from '../../www/img/volatility.svg';
import ForexIcon from '../../www/img/forex.svg';
import IndicesIcon from '../../www/img/indices.svg';
import CommoditiesIcon from '../../www/img/commodities.svg';
import StocksIcon from '../../www/img/stocks.svg';

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
				<Tab img={<AllIcon className="asset-picker-filter-icon" />} tooltip="All" />
				<Tab img={<FavoritesIcon className="asset-picker-filter-icon" />} tooltip="Favorites" />
				<Tab img={<OpenIcon className="asset-picker-filter-icon" />} tooltip="Open" />
				<Tab img={<VolatilityIcon className="asset-picker-filter-icon" />} tooltip="Volatility" />
				<Tab img={<ForexIcon className="asset-picker-filter-icon" />} tooltip="Forex" />
				<Tab img={<IndicesIcon className="asset-picker-filter-icon" />} tooltip="Indices" />
				<Tab img={<CommoditiesIcon className="asset-picker-filter-icon" />} tooltip="Commodities" />
				<Tab img={<StocksIcon className="asset-picker-filter-icon" />} tooltip="OTC Stocks" />
			</TabList>
		);
	}
}
