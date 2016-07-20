import React, { Component } from 'react';
import { connect } from 'react-redux';
import PayoutPickerCard from './PayoutPickerCard';

@connect(state => ({ trades: state.trades.toJS() }))
export default class PayoutPickerContainer extends Component {
	render() {
		return (
			<PayoutPickerCard {...this.props} />
		);
	}
}
