import React from 'react';
import { LiveData } from "binary-live-api";
import OfferingsList from "./OfferingsList";


export default class OfferingsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('2BpkX3lNIkuKH5VLIQqDHTJWNsYgOBTEBL85u9iMszP4RqHLGd5SM1Jt1TgqssbFNdHAi3cTgO6ubLuHYa1iXm77l7G5q4EMU50vjU85YRJF4VqcOYzFLDqieWEOsc7y')

		liveData.onDataChange = (function(data) {
			this.state = { offerings: liveData.offerings };
		}).bind(this);

		this.state = { offerings: liveData.offerings || [] };
  	}

	render() {

		return (
			<OfferingsList offerings={this.state.offerings} />
		);
	}
}
