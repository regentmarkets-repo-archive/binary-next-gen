import React from 'react';
import { LiveData } from 'binary-live-api';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('QXECUwoEbNhYVxZeQ7yoWoaQXceQXdaNULXn8oEdJtPyR7IYfcksvr3UQ8QbcfmgE6hWTlcZMTpfRAk1LHhfPYR5JeB2cd7PeylriQcgt2wnvA6EfblXP8yXpVVYzVpA')

		liveData.onDataChange = (function(data) {
			this.setState( { ticks: liveData.Ticks });
		}).bind(this);

		this.state = { ticks: liveData.Ticks };
  	}

	render() {
		return (
  			<TickTable tickData={this.state.ticks} />
		);
	}
}
