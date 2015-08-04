import React from 'react';
import { LiveData } from 'binary-live-api';
import TradeForm from './TradeForm';
import TradeConfirmation from './TradeConfirmation';

export default class TradePage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('fcR6ZySPS3u0ezqOEt0bCZqpAuvXejg0vRUtulSAaCDISBPlrWtjOiIK1u8ZhGf0D8fJVWi4Zepb35jwAD6IpE7JF3gyFpT0BD6aH8Q7xIhb4FNKqasHWySW1pRJBI7T')

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
