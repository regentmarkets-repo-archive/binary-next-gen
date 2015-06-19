import React from "react";
import { LiveEvents, LiveData } from "binary-live-api";
import TickTable from "components/TickTable";


export default class TicksPage extends React.Component {

	constructor(props) {
	    super(props);

		LiveEvents.on('message', (data) => {
			this.setState( { ticks: LiveData.Ticks });
		});

	    this.state = { ticks: LiveData.Ticks };

		LiveData.init();
  	}

	static getProps() {
		return {};
	}

	render() {

		return (
  			<TickTable tickData={this.state.ticks} />
		);
	}
}
