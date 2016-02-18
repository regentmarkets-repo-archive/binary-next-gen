import React, { Component } from 'react';
import { connect } from 'react-redux';
import TickDurationCard from './TickDurationCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TickDurationContainer extends Component {
	render() {
		return (
			<TickDurationCard {...this.props} />
		);
	}
}
