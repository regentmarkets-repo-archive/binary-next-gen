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
				<Tab imgSrc="img/barchart.svg" hint="All" />
				<Tab img={<FavoritesIcon />} hint="Favorites" />
				<Tab imgSrc="img/barchart.svg" hint="Open" />
				<Tab imgSrc="img/ohlc.svg" hint="Volatility" />
				<Tab imgSrc="img/ohlc.svg" hint="Indices" />
				<Tab imgSrc="img/ohlc.svg" hint="OTC Stocks" />
				<Tab imgSrc="img/ohlc.svg" hint="Forex" />
				<Tab imgSrc="img/ohlc.svg" hint="Commodities" />
			</TabList>
		);
	}
}
