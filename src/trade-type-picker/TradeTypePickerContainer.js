import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TradeTypePickerCard from './TradeTypePickerCard';

@connect(state => ({ trades: state.trades.toJS() }))
export default class TradeTypePickerContainer extends Component {

	static propTypes = {
		dispatch: PropTypes.func,
	};

	render() {
		return (
			<TradeTypePickerCard {...this.props} tickOnly />		// TODO: hardcoded tickOnly
		);
	}
}
