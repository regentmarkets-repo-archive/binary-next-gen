import React from 'react';
import { LiveData } from 'binary-live-api';
import SymbolList from './SymbolList';


export default class ActiveSymbolsPage extends React.Component {

	constructor(props) {
		super(props);

		LiveData.on('message', () => {
			this.setState({ activeSymbols: LiveData.activeSymbols() });
			console.log('LiveData.offerings()', LiveData.offerings());
		});

		this.state = { activeSymbols: LiveData.activeSymbols() || [] };

		LiveData.init('DlPFBthdk9t-5IYJu2YezfEUCa0');
	}

	render() {

		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
