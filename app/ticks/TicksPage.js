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

		LiveData.init('1C8FsTiUegCGq2ZqM8ntMdHsUUQNE9grp5p9gD6VmSmyocfcJiS0n2uOM83kakaYZMRfFCbZGI6kzfu0lYkHHoYFpMJRKKVaVHe0Ezs1KqL6JZvMwNqAUFxLfulKoalD');
  	}

	render() {
		return (
  			<TickTable tickData={this.state.ticks} />
		);
	}
}
