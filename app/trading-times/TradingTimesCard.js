import React from 'react';
import { InputGroup, MarketSubmarketSelector } from '../common';
import TradingTimesTable from './TradingTimesTable';
import { todayStr, oneYearAgoStr } from '../common/DateUtils';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const TradingTimesCard = ({assets, params}) => {
	const { tree, times, list } = assets.toJS();
	const marketName = (params.market && capitalize(params.market)) || 'Forex';
	const submarkets = Object.keys(tree[marketName] || []);
	const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket_display_name;

	return (
		<div>
			<InputGroup type="date" value={todayStr()} min={oneYearAgoStr()} max={todayStr()} />
			<MarketSubmarketSelector tree={tree} />
			{submarkets.map(submarket =>
				<TradingTimesTable
					key={submarket}
					submarket={submarket}
					times={times.filter(a => submarketForAsset(a.symbol) === submarket)} />
			)}
		</div>
	);
};

TradingTimesCard.propTypes = {
	assets: React.PropTypes.object.isRequired,
	params: React.PropTypes.object.isRequired,
};

// TradingTimesCard.shouldComponentUpdate(nextProps, nextState) => nextProps.assets !== this.props.assets;

export default TradingTimesCard;
