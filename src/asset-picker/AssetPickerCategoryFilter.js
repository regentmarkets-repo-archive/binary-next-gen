import React, { PureComponent } from 'react';
import { TabList, Tab } from 'binary-components';

export default class AssetPickerCategoryFilter extends PureComponent {

	onChange = num =>
		console.log(num);

	render() {
		return (
			<TabList onChange={this.onChange}>
				<Tab imgSrc="img/all.svg" hint="All" />
				<Tab imgSrc="img/favorites.svg" hint="Favorites" />
				<Tab imgSrc="img/open.svg" hint="Favorites" />
				<Tab imgSrc="img/volatility.svg" hint="Volatility" />
				<Tab imgSrc="img/indices.svg" hint="Indices" />
				<Tab imgSrc="img/stocks.svg" hint="OTC Stocks" />
				<Tab imgSrc="img/forex.svg" hint="Forex" />
				<Tab imgSrc="img/commodity.svg" hint="Commodities" />
			</TabList>
		);
	}
}
