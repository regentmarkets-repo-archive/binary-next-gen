import React from 'react';
import { LiveData } from 'binary-live-api';
import TradeForm from './TradeForm';
import TradeConfirmation from './TradeConfirmation';

export default class TradePage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('QXECUwoEbNhYVxZeQ7yoWoaQXceQXdaNULXn8oEdJtPyR7IYfcksvr3UQ8QbcfmgE6hWTlcZMTpfRAk1LHhfPYR5JeB2cd7PeylriQcgt2wnvA6EfblXP8yXpVVYzVpA')

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
