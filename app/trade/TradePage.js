import React from 'react';
import TradeForm from './TradeForm';
import TradeConfirmation from './TradeConfirmation';

export default class TradePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { };
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
