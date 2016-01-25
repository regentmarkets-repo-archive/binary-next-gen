import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradingTimesCard from './TradingTimesCard';

@connect(state => ({ assets: state.assets, tradingTimesFilter: state.workspace.get('tradingTimes') }))
export default class TradingTimesContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<TradingTimesCard {...this.props} />
		);
	}
}
