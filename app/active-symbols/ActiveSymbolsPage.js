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

		LiveData.init('9cRhCQRGfhyKJd016aKPkPxjkwXOiPhMHkJmK9pbAOnW3lDqz5fiV8KokKoJY9ZuDqJtkxQyQqWWc3Hvsw2nGyozyWj06zDQyfXIyJhhNc5ezHUpqfkAxFM9UnuiOpyr');
	}

	render() {

		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
