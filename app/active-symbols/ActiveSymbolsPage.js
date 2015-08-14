import React from 'react';
import LiveData from '../_data/LiveData';
import SymbolList from './SymbolList';


export default class ActiveSymbolsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		liveData.onDataChange = () => {
			this.state = { activeSymbols: liveData.activeSymbols };
		}.bind(this);

		this.state = { activeSymbols: liveData.activeSymbols || [] };
	}

	render() {
		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
