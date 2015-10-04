import React from 'react';
import { connect } from 'react-redux';
import { MobilePage } from '../common';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TickTradePage extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
    };

	render() {
		return (
			<MobilePage>
				yolo
				{this.props.children}
			</MobilePage>
		);
	}
}
