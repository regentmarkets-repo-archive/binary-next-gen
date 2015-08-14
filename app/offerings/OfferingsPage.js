import React from 'react';
import LiveData from '../_data/LiveData';
import OfferingsList from './OfferingsList';


export default class OfferingsPage extends React.Component {

	constructor(props) {
		super(props);

		const liveData = new LiveData();

		liveData.onDataChange = () => {
			this.state = { offerings: liveData.offerings };
		};

		this.state = { offerings: liveData.offerings || [] };
  	}

	render() {
		return (
			<OfferingsList offerings={this.state.offerings} />
		);
	}
}
