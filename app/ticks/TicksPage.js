import React from 'react';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		liveData.onDataChange = (dataType) => {
			if (dataType === 'activeSymbols') {
				liveData.trackActiveSymbols();
			}
			if (dataType === 'ticks') {
				this.setState( { ticks: liveData.ticks });
			}
		};

		this.state = { ticks: liveData.ticks };

		liveData.api.getActiveSymbolsBrief();
  	}

	render() {
		return (
			<div>
				<TickTable ticks={this.state.ticks} />
			</div>
		);
	}
}
