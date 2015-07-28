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

		LiveData.init('1C8FsTiUegCGq2ZqM8ntMdHsUUQNE9grp5p9gD6VmSmyocfcJiS0n2uOM83kakaYZMRfFCbZGI6kzfu0lYkHHoYFpMJRKKVaVHe0Ezs1KqL6JZvMwNqAUFxLfulKoalD');
  	}

	render() {

		return (
			<OfferingsList offerings={this.state.offerings} />
		);
	}
}
