import React from 'react';
import LiveData from '../_data/livedata';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('aaPPaXJZlhm72g5Zi7doW7JstsRlHHBamrHVDEC0xyDmdm97')

		liveData.onDataChange = (function(dataType) {
			if (dataType == 'activeSymbols') {
				liveData.trackActiveSymbols();
			}
			if (dataType == 'ticks') {
				this.setState( { ticks: liveData.ticks });
			}
		}).bind(this);

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
