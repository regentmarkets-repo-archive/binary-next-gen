import React from "react";
import { LiveEvents, LiveData } from "binary-live-api";
import OfferingsList from "components/OfferingsList";


export default class OfferingsPage extends React.Component {

	constructor(props) {
	    super(props);

		LiveEvents.on('message', (data) => {
			this.setState({ offerings: LiveData.offerings() });
			console.log('LiveData.offerings()', LiveData.offerings());
		});

	    this.state = { offerings: LiveData.offerings() || [] };

		LiveData.init();
  	}

	static getProps() {
		return {};
	}

	render() {

		return (
			<OfferingsList offerings={this.state.offerings} />
		);
	}
}
