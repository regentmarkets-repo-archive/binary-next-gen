import React from 'react';
import { connect } from 'react-redux';
import PayoutSelectorCard from './PayoutSelectorCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class PayoutSelectorContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func,
		tickTrade: React.PropTypes.object,
		onChange: React.PropTypes.func,
	};

	render() {
		return (
			<PayoutSelectorCard {...this.props} />
		);
	}
}
