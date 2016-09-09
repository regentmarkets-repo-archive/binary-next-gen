import React, { PureComponent } from 'react';
import { TabList, Tab } from 'binary-components';

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
		onChange: PropTypes.func.isRequired,
		value: string,
	};

	onChange = num =>
		this.props.onChange(values[num]);

	render() {
		return (
			<TabList onChange={this.onChange}>
				<Tab imgSrc="img/barchart.svg" hint="All" />
				<Tab imgSrc="img/favorites.svg" hint="Favorites" />
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
