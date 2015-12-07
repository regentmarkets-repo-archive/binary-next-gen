import React from 'react';
import { connect } from 'react-redux';
import TradeTypeSelectorCard from './TradeTypeSelectorCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TradeTypeSelectorContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<TradeTypeSelectorCard {...this.props} />
		);
	}
}
