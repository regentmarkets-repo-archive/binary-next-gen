import React from "react";
import { LiveData } from "binary-live-api";
import SymbolList from "./SymbolList";


export default class ActiveSymbolsPage extends React.Component {

	constructor(props) {
		super(props);

		console.log(LiveData);

		LiveData.on('message', (data) => {
			this.setState({ activeSymbols: LiveData.activeSymbols() });
			console.log('LiveData.offerings()', LiveData.offerings());
		});

		this.state = { activeSymbols: LiveData.activeSymbols() || [] };

		LiveData.init('gP0Yb1ltloQIAcCbX2-Y2HPdll0');
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
