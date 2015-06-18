import React from "react";
import { LiveEvents, LiveApi, LiveData } from "binary-live-api";
import TickTable from "components/TickTable";
import SymbolList from "components/SymbolList";
import OfferingsList from "components/OfferingsList";


export default class TradePage extends React.Component {

	constructor(props) {
	    super(props);

		function getState() {
			console.log('LLLL', LiveData);
			return {
				ticks: LiveData.Ticks,
				activeSymbols: LiveData.activeSymbols() || [],
				offerings: LiveData.offerings() || []
			};
		}

		LiveEvents.on('message', (data) => {
			this.setState(getState());
		});

	    this.state = getState();

		LiveData.init();
  	}

	static getProps() {
		return {};
	}

	render() {

		return (
			<div>
	  			<TickTable tickData={this.state.ticks}/>
				<SymbolList symbols={this.state.activeSymbols} />
			</div>
		);
	}
}
