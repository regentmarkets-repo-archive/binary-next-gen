import React from 'react';
import { LiveData } from "binary-live-api";
import OfferingsList from "./OfferingsList";


export default class OfferingsPage extends React.Component {

	constructor(props) {
		super(props);

		LiveData.on('message', (data) => {
			this.setState({ offerings: LiveData.offerings() });
			console.log('LiveData.offerings()', LiveData.offerings());
		});

		this.state = { offerings: LiveData.offerings() || [] };

		LiveData.init('DlPFBthdk9t-5IYJu2YezfEUCa0');
  	}

	render() {

		return (
			<OfferingsList offerings={this.state.offerings} />
		);
	}
}
