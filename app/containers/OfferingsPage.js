import React from "react";
import { LiveData } from "binary-live-api";
import OfferingsList from "components/OfferingsList";


export default class OfferingsPage extends React.Component {

	constructor(props) {
	    super(props);

		LiveData.on('message', (data) => {
			this.setState({ offerings: LiveData.offerings() });
			console.log('LiveData.offerings()', LiveData.offerings());
		});

	    this.state = { offerings: LiveData.offerings() || [] };

		LiveData.init('gP0Yb1ltloQIAcCbX2-Y2HPdll0');
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
