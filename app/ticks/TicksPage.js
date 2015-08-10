import React from 'react';
import LiveData from '../_data/livedata';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('aaPPaXJZlhm72g5Zi7doW7JstsRlHHBamrHVDEC0xyDmdm97')

		liveData.onDataChange = (function(dataType) {
			console.log('data change', dataType);
			if (dataType == 'activeSymbols') {
				console.log(liveData.activeSymbols);
				liveData.trackActiveSymbols();
			}
			if (dataType == 'ticks') {
				this.setState( { ticks: liveData.Ticks });
			}
		}).bind(this);

		this.state = { ticks: liveData.Ticks };

		liveData.api.getActiveSymbolsByName();
  	}

	render() {
		return (
			<div>
				{JSON.stringify(this.state, null, '\t')}

			</div>
		);
	}
}
