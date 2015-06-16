import React from "react";
import { LiveEvents, LiveData } from "binary-live-api";
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
