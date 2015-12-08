import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { InputGroup, MarketSelector } from '../_common';
import { todayString } from '../_utils/DateUtils';
import TradingTimesTable from './TradingTimesTable';

const oneYearAgoStr = () => new Date().setFullYear(new Date().getFullYear() - 1);

export default class TradingTimesCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		tradingTimesFilter: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, tradingTimesFilter } = this.props;
		const { times, list } = assets.toJS();
		const submarket = tradingTimesFilter.get('submarket');
		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket_display_name;

		return (
			<div>
				<div className="row">
					<MarketSelector
						onChange={x => actions.updateTickTradeSubmarket(x)}
						showAllOption={false} />
					<InputGroup type="date" value={todayString()} min={oneYearAgoStr()} max={todayString()} className="trading-times-date-picker" />
				</div>
				<TradingTimesTable
					key={submarket}
					submarket={submarket}
					times={times.filter(a => submarketForAsset(a.symbol) === submarket)} />
			</div>
		);
	}
}
