import React from "react";
import { LiveEvents, LiveData } from "binary-live-api";
import SymbolList from "components/SymbolList";


export default class ActiveSymbolsPage extends React.Component {

	constructor(props) {
	    super(props);

		LiveEvents.on('message', (data) => {
			this.setState({ activeSymbols: LiveData.activeSymbols() });
			console.log('LiveData.offerings()', LiveData.offerings());
		});

	    this.state = { activeSymbols: LiveData.activeSymbols() || [] };

		LiveData.init();
  	}

	static getProps() {
		return {};
	}

	render() {

		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
