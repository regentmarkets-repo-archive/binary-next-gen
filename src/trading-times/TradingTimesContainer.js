import React from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import TradingTimesCard from './TradingTimesCard';
import tradingTimesSelectors from '../_selectors/TradingTimesSelectors';

@connect(tradingTimesSelectors)
export default class TradingTimesContainer extends React.Component {
	static propTypes = {
		assets: React.PropTypes.instanceOf(List),
		tradingTimes: React.PropTypes.instanceOf(List),
		tradingTimesFilter: React.PropTypes.object,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { assets, tradingTimes, tradingTimesFilter } = this.props;
		return (
			<TradingTimesCard
				{...this.props}
				tradingTimes={tradingTimes.toJS()}
				assets={assets.toJS()}
				tradingTimesFilter={tradingTimesFilter}
			/>
		);
	}
}
