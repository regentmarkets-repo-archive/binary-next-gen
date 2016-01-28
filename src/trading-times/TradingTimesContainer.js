import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradingTimesCard from './TradingTimesCard';
import tradingTimesSelectors from '../_selectors/TradingTimesSelectors';

@connect(tradingTimesSelectors)
export default class TradingTimesContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<TradingTimesCard {...this.props} />
		);
	}
}
