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

		LiveData.init('9cRhCQRGfhyKJd016aKPkPxjkwXOiPhMHkJmK9pbAOnW3lDqz5fiV8KokKoJY9ZuDqJtkxQyQqWWc3Hvsw2nGyozyWj06zDQyfXIyJhhNc5ezHUpqfkAxFM9UnuiOpyr');
  	}

	render() {

		return (
			<OfferingsList offerings={this.state.offerings} />
		);
	}
}
