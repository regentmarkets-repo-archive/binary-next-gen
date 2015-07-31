import React from 'react';
import { LiveData } from "binary-live-api";
import OfferingsList from "./OfferingsList";


export default class OfferingsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('QXECUwoEbNhYVxZeQ7yoWoaQXceQXdaNULXn8oEdJtPyR7IYfcksvr3UQ8QbcfmgE6hWTlcZMTpfRAk1LHhfPYR5JeB2cd7PeylriQcgt2wnvA6EfblXP8yXpVVYzVpA')

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
