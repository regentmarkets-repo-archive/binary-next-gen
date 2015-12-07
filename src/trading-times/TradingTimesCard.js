import React from 'react';
import { InputGroup, MarketSelector } from '../_common';
import TradingTimesTable from './TradingTimesTable';

const todayStr = () => new Date();
const oneYearAgoStr = () => new Date().setFullYear(new Date().getFullYear() - 1);

export default class TradingTimesCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		tradingTimesFilter: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.assets !== this.props.assets ||
			nextProps.tradingTimesFilter !== this.props.tradingTimesFilter;
	}

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
					<InputGroup type="date" value={todayStr()} min={oneYearAgoStr()} max={todayStr()} className="trading-times-date-picker" />
				</div>
				<TradingTimesTable
					key={submarket}
					submarket={submarket}
					times={times.filter(a => submarketForAsset(a.symbol) === submarket)} />
			</div>
		);
	}
}
