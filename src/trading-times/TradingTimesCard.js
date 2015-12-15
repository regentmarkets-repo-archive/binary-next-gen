import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { InputGroup, MarketSelector } from '../_common';
import { dateToDateString, todayString } from '../_utils/DateUtils';
import TradingTimesTable from './TradingTimesTable';

const oneYearAfterStr = () => new Date().setFullYear(new Date().getFullYear() + 1);

export default class TradingTimesCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		tradingTimesFilter: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, tradingTimesFilter } = this.props;
		const { times, list, tree } = assets.toJS();
		const submarket = tradingTimesFilter.get('submarket');
		const submarketName = Object.keys(tree).map(market => {
			const subs = tree[market].submarkets;
			if (Object.keys(subs).indexOf(submarket) > -1) return subs[submarket].display_name;
		}).filter(name => !!name)[0];

		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket;
		const tradingTimesDate = tradingTimesFilter.get('date');

		return (
			<div>
				<div className="row">
					<MarketSelector
						onChange={x => actions.updateTickTradeSubmarket(x)}
						showAllOption={false}
					/>
					<InputGroup
						type="date"
						value={dateToDateString(tradingTimesDate)}
						min={todayString()}
						max={oneYearAfterStr()}
						className="trading-times-date-picker"
						onChange={x => actions.updateTradingTimesDate(x.target.valueAsDate)}
					/>
				</div>
				<TradingTimesTable
					key={submarket}
					submarket={submarketName}
					times={times.filter(a => submarketForAsset(a.symbol) === submarket)}
				/>
			</div>
		);
	}
}
