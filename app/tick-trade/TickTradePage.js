import React from 'react';
import { connect } from 'react-redux';
import Toolbar from '../common/Toolbar';
import TickTradePane from './TickTradePane';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TickTradePage extends React.Component {
	render() {
		return (
			<div className="login-content">
				<Toolbar />
				<TickTradePane />
			</div>
		);
	}
}
