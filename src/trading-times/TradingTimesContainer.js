import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import TradingTimesCard from './TradingTimesCard';
import tradingTimesSelectors from './tradingTimesSelectors';

@connect(tradingTimesSelectors)
export default class TradingTimesContainer extends Component {

	render() {
		return (
			<TradingTimesCard
				{...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
