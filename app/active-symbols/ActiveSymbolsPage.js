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

		LiveData.init('1C8FsTiUegCGq2ZqM8ntMdHsUUQNE9grp5p9gD6VmSmyocfcJiS0n2uOM83kakaYZMRfFCbZGI6kzfu0lYkHHoYFpMJRKKVaVHe0Ezs1KqL6JZvMwNqAUFxLfulKoalD');
	}

	render() {

		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
