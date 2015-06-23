import React from "react";
import { LiveData } from "binary-live-api";
import TickTable from "components/TickTable";


export default class TicksPage extends React.Component {

	constructor(props) {
	    super(props);

		LiveData.on('message', (data) => {
			this.setState( { ticks: LiveData.Ticks });
		});

	    this.state = { ticks: LiveData.Ticks };

		LiveData.init('gP0Yb1ltloQIAcCbX2-Y2HPdll0');
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
