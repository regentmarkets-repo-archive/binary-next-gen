import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import TradingTimesCard from './TradingTimesCard';
import tradingTimesSelectors from './tradingTimesSelectors';

@connect(tradingTimesSelectors)
export default class TradingTimesContainer extends PureComponent {

	render() {
		return (
			<TradingTimesCard
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
