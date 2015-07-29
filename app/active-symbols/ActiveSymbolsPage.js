import React from 'react';
import { LiveData } from 'binary-live-api';
import SymbolList from './SymbolList';


export default class ActiveSymbolsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('2BpkX3lNIkuKH5VLIQqDHTJWNsYgOBTEBL85u9iMszP4RqHLGd5SM1Jt1TgqssbFNdHAi3cTgO6ubLuHYa1iXm77l7G5q4EMU50vjU85YRJF4VqcOYzFLDqieWEOsc7y')

		liveData.onDataChange = (function(data) {
			this.state = { activeSymbols: liveData.activeSymbols };
		}).bind(this);

		this.state = { activeSymbols: liveData.activeSymbols || [] };
	}

	render() {

		return (
			<SymbolList symbols={this.state.activeSymbols} />
		);
	}
}
