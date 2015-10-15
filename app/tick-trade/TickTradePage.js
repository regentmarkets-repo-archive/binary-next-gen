import React from 'react';
import { connect } from 'react-redux';
import { MobilePage } from '../common';

@connect(state => ({ tickTrade: state.tickTrade, account: state.account, assets: state.assets }))
export default class TickTradePage extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
		trickTrade: React.PropTypes.object,
		account: React.PropTypes.object,
		assets: React.PropTypes.object,
    };

	render() {
		return (
			<MobilePage>
				{this.props.children}
			</MobilePage>
		);
	}
}
