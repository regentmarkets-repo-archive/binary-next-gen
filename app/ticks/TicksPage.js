import React from 'react';
import { LiveData } from 'binary-live-api';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('fcR6ZySPS3u0ezqOEt0bCZqpAuvXejg0vRUtulSAaCDISBPlrWtjOiIK1u8ZhGf0D8fJVWi4Zepb35jwAD6IpE7JF3gyFpT0BD6aH8Q7xIhb4FNKqasHWySW1pRJBI7T')

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
