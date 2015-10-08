import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import TradingTimesTable from './TradingTimesTable';

const TradingTimesPane = ({tradingTimes, params}) => {
	const marketLinks = tradingTimes.map(x => ({
		href: '/trading-times/' + x.name.toLowerCase(),
		text: x.name,
	}));

	const marketFromRoute = tradingTimes.find(x => x.name.toLowerCase() === params.market.toLowerCase());
	const marketSelected = marketFromRoute || { submarkets: [] };

	return (
		<div>
			<p><input type="date" /> </p>
			<SegmentedControl segments={marketLinks} />
			{marketSelected.submarkets.map((s, i) => <TradingTimesTable key={i} submarket={s} />) }
		</div>
	);
};

TradingTimesPane.propTypes = {
	params: React.PropTypes.object.isRequired,
	tradingTimes: React.PropTypes.array.isRequired,
};

export default TradingTimesPane;
