import React from 'react';
import { LiveData } from 'binary-live-api';
import TickTable from './TickTable';

export default class TicksPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('2BpkX3lNIkuKH5VLIQqDHTJWNsYgOBTEBL85u9iMszP4RqHLGd5SM1Jt1TgqssbFNdHAi3cTgO6ubLuHYa1iXm77l7G5q4EMU50vjU85YRJF4VqcOYzFLDqieWEOsc7y')

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
