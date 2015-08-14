import React from 'react';
import LiveData from '../_data/LiveData';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		liveData.onDataChange = (dataType) => {
			if (dataType === 'activeSymbols') {
				liveData.trackActiveSymbols();
			}
			if (dataType === 'ticks') {
				this.setState( { ticks: liveData.ticks });
			}
		};

		this.state = { ticks: liveData.ticks };

		liveData.api.getActiveSymbolsByName();
  	}

	render() {
		return (
			<div>
				<TickTable ticks={this.state.ticks} />
			</div>
		);
	}
}
