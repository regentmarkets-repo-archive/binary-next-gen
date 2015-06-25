import React from "react";
import { LiveData } from "binary-live-api";
import MarketsList from "./MarketsList";


export default class MarketsPage extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {
			markets: [{
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
			}]
		};

		LiveData.init('gP0Yb1ltloQIAcCbX2-Y2HPdll0');
  	}

	static getProps() {
		return {};
	}

	render() {
		return (
  			<MarketsList markets={this.state.markets} />
		);
	}
}
