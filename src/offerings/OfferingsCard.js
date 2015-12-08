import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import OfferingsList from './OfferingsList';

@connect(state => ({ offerings: state.serverData.offerings }))
export default class OfferingsCard extends React.Component {

	static propTypes = {
		offerings: PropTypes.array.isRequired,
	};

	render() {
		const { offerings } = this.props;

		return (
			<OfferingsList offerings={offerings} />
		);
	}
}
