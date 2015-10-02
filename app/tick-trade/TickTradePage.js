import React from 'react';
import { connect } from 'react-redux';
import { MobilePage } from '../common';
import TickTradePane from './TickTradePane';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TickTradePage extends React.Component {
	render() {
		return (
			<MobilePage>
				<TickTradePane />
			</MobilePage>
		);
	}
}
