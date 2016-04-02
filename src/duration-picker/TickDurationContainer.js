import React, { Component } from 'react';
import { connect } from 'react-redux';
import BetterDurationCard from './BetterDurationCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TickDurationContainer extends Component {
	render() {
		return (
			<BetterDurationCard {...this.props} />
		);
	}
}
