import React from 'react';
import { LiveData } from 'binary-live-api';
import SymbolList from './SymbolList';


export default class ActiveSymbolsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('QXECUwoEbNhYVxZeQ7yoWoaQXceQXdaNULXn8oEdJtPyR7IYfcksvr3UQ8QbcfmgE6hWTlcZMTpfRAk1LHhfPYR5JeB2cd7PeylriQcgt2wnvA6EfblXP8yXpVVYzVpA')

		liveData.onDataChange = (function(data) {
			this.state = { activeSymbols: liveData.activeSymbols };
		}).bind(this);

		this.state = { activeSymbols: liveData.activeSymbols || [] };
	}

	render() {

		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
