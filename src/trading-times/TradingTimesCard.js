import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { InputGroup, MarketPicker } from '../_common';
import { dateToDateString, todayString, oneYearAfterStr } from '../_utils/DateUtils';
import TradingTimesTable from './TradingTimesTable';

export default class TradingTimesCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.array.isRequired,
		tradingTimes: PropTypes.array.isRequired,
		tradingTimesFilter: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, tradingTimes, tradingTimesFilter } = this.props;
		const submarket = tradingTimesFilter.submarket;
		const tradingTimesDate = tradingTimesFilter.date;

		// const submarketName = Object.keys(tree).map(market => {
		// 	const subs = tree[market].submarkets;
		// 	if (Object.keys(subs).indexOf(submarket) > -1) return subs[submarket].display_name;
		// }).filter(name => !!name)[0];

		const submarketForAsset = symbol =>
			assets.find(x => x.symbol === symbol).submarket;

		return (
			<div>
				<div className="row">
					<MarketPicker
						onChange={x => actions.updateTickTradeSubmarket(x)}
						showAllOption={false}
						value={submarket}
					/>
					<InputGroup
						type="date"
						defaultValue={dateToDateString(tradingTimesDate)}
						min={todayString()}
						max={oneYearAfterStr()}
						className="trading-times-date-picker"
						onChange={x => actions.updateTradingTimesDate(x.target.valueAsDate)}
					/>
				</div>
				<TradingTimesTable
					key={submarket}
					submarket={submarket.name}
					times={tradingTimes.filter(a => submarketForAsset(a.symbol) === submarket)}
					{...this.props}
				/>
			</div>
		);
	}
}
