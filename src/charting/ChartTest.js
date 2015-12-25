import React from 'react';
import MarketChart from './MarketChart';
import TradeChart from './TradeChart';
import MobileChart from './MobileChart';

export default class ChartTest extends React.Component {
	render() {
		return (
			<div>
				<MarketChart />
				<TradeChart />
				<MobileChart />
			</div>
		);
	}
}
