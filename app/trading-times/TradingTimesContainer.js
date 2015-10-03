import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({ tradingTimes: state.serverData.tradingTimes }))
export default class TradingTimesPane extends React.Component {

	static propTypes = {
		params: React.PropTypes.object.isRequired,
		tradingTimes: React.PropTypes.array.isRequired,
	};

	render() {
		return (
			<TradingTimesPane {...this.props} />
		);
	}
}
