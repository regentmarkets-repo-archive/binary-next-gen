import React from "react";
import { ticks } from "store-helpers/LiveData";
import TickTable from "components/TickTable";
import { LiveEvents } from "binary-live-api";

export default class TradePage extends React.Component {

	constructor(props) {
	    super(props);

		LiveEvents.on('message', (data) => {
			this.setState({ticks});
		});

	    this.state = {ticks};
  	}

	static getProps() {
		return {};
	}

	render() {

		return (
	  		<TickTable ticks={this.state.ticks}/>
		);
	}
}
