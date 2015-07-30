import React from 'react';
import { LiveData } from 'binary-live-api';
import TradeForm from './TradeForm';
import TradeConfirmation from './TradeConfirmation';

export default class TradePage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('2BpkX3lNIkuKH5VLIQqDHTJWNsYgOBTEBL85u9iMszP4RqHLGd5SM1Jt1TgqssbFNdHAi3cTgO6ubLuHYa1iXm77l7G5q4EMU50vjU85YRJF4VqcOYzFLDqieWEOsc7y')

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
