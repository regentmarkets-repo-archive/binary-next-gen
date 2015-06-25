import React from "react";
import { LiveData } from "binary-live-api";
import MarketsList from "./MarketsList";
import MarketsSearch from "./MarketsSearch";

export default class MarketsPage extends React.Component {

	static allMarkets = [{
		id: 'eur50',
		name: 'Euro 50 Index'
	}, {
		id: 'wsidx',
		name: 'Wall Streen Index'
	}, {
		id: 'danone',
		name: 'Danone'
	}, {
		id: 'loreal',
		name: 'L\'Oreal'
	}, {
		id: 'vivendi',
		name: 'Vivendi'
	}, {
		id: 'oil',
		name: 'Oil/USD'
	}, {
		id: 'gold',
		name: 'Gold/USD'
	}, {
		id: 'platinum',
		name: 'Platinum/USD'
	}, {
		id: 'rnd100',
		name: 'Random 100 Index'
	}, {
		id: 'rndsun',
		name: 'Random Sun'
	}];

	constructor(props) {
	    super(props);

	    this.state = {
			search: '',
			markets: MarketsPage.allMarkets
		};

		LiveData.init('gP0Yb1ltloQIAcCbX2-Y2HPdll0');
  	}

	static getProps() {
		return {};
	}

	static searchFor(query) {
		return MarketsPage.allMarkets.filter(m => m.name.includes(query));
	}

	onQueryChange(query) {

		this.setState({
			search: query,
			markets: MarketsPage.searchFor(query)
		})
	}

	render() {

		const { search, markets } = this.state;

		return (
			<div>
				<MarketsSearch search={search} onChange={::this.onQueryChange}/>
  				<MarketsList markets={markets} />
			</div>
		);
	}
}
