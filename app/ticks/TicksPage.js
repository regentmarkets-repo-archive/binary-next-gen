import React from 'react';
import { LiveData } from 'binary-live-api';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		LiveData.on('message', (data) => {
			this.setState( { ticks: LiveData.Ticks });
		});

		this.state = { ticks: LiveData.Ticks };

		LiveData.init('9cRhCQRGfhyKJd016aKPkPxjkwXOiPhMHkJmK9pbAOnW3lDqz5fiV8KokKoJY9ZuDqJtkxQyQqWWc3Hvsw2nGyozyWj06zDQyfXIyJhhNc5ezHUpqfkAxFM9UnuiOpyr');
  	}

	render() {
		return (
  			<TickTable tickData={this.state.ticks} />
		);
	}
}
