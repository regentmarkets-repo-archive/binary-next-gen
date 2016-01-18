import React from 'react';
import { connect } from 'react-redux';
import PayoutPickerCard from './PayoutPickerCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class PayoutPickerContainer extends React.Component {
	render() {
		return (
			<PayoutPickerCard {...this.props} />
		);
	}
}
