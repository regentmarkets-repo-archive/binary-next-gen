import React from 'react';
import TradeChart from './TradeChart';
import MarketChart from './MarketChart';

const data = [1, 4, 2, 5, 3, 2, 0, 1, 4, 2, 5, 3, 2, 0];

export default class ChartTest extends React.Component {

	render() {
		return (
			<div>
				<TradeChart history={data} />
				<MarketChart />
			</div>
		);
	}
}
