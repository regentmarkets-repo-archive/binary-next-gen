import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PayoutSelectorCard from './PayoutSelectorCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class PayoutSelectorContainer extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		tickTrade: PropTypes.object,
		onChange: PropTypes.func,
	};

	render() {
		return (
			<PayoutSelectorCard {...this.props} />
		);
	}
}
