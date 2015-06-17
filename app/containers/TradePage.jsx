import React from "react";
import { LiveEvents, LiveApi, LiveData } from "binary-live-api";
import TickTable from "components/TickTable";

export default class TradePage extends React.Component {

	constructor(props) {
	    super(props);

		LiveEvents.on('message', (data) => {
			console.log(LiveData);
			this.setState(LiveData.Ticks);
		});

	    this.state = LiveData.Ticks;

		LiveData.init();
		LiveApi.trackSymbols(['R_100', 'frxXPDUSD', 'USATNT', 'frxXPTEUR']);
  	}

	static getProps() {
		return {};
	}

	render() {

		return (
	  		<TickTable tickData={this.state}/>
		);
	}
}
