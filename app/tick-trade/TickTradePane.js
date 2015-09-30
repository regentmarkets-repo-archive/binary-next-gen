import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TickTradePane extends React.Component {

	render() {
		return (
			<div>
			</div>
		);
	}
}
