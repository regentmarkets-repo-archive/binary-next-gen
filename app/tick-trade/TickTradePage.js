import React from 'react';
import { connect } from 'react-redux';
import { MobilePage } from '../common';

@connect(state => ({ tickTrade: state.tickTrade, account: state.account }))
export default class TickTradePage extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
    };

	render() {
		return (
			<MobilePage>
				{this.props.children}
			</MobilePage>
		);
	}
}
