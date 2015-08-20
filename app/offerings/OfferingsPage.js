import React from 'react';
import { connect } from 'react-redux';
import OfferingsList from './OfferingsList';

@connect(state => ({ offerings: state.serverData.offerings }))
export default class OfferingsPage extends React.Component {

	static propTypes = {
		offerings: React.PropTypes.array.isRequired,
	};

	render() {
		const { offerings } = this.props;

		return (
			<OfferingsList offerings={offerings} />
		);
	}
}
