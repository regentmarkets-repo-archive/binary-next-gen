import React from 'react';
import LiveData from '../_data/LiveData';
import TradeForm from './TradeForm';
import TradeConfirmation from './TradeConfirmation';

export default class TradePage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		this.state = { };

		liveData.onDataChange = (function(data) {
			this.setState({
			});
		}).bind(this);
	}

	render() {

		return (
			<div>
				<TradeForm />
				<TradeConfirmation />
			</div>
		);
	}
}
