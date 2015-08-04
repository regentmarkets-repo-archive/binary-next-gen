import React from 'react';
import { LiveData } from "binary-live-api";
import OfferingsList from "./OfferingsList";


export default class OfferingsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData('fcR6ZySPS3u0ezqOEt0bCZqpAuvXejg0vRUtulSAaCDISBPlrWtjOiIK1u8ZhGf0D8fJVWi4Zepb35jwAD6IpE7JF3gyFpT0BD6aH8Q7xIhb4FNKqasHWySW1pRJBI7T')

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
