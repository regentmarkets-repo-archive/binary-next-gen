import React from 'react';
import { InputGroup, MarketSelector } from '../common';
import TradingTimesTable from './TradingTimesTable';
import { todayStr, oneYearAgoStr } from '../common/DateUtils';

export default class TradingTimesCard extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		tradingTimesWorkspace: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.assets !== this.props.assets ||
			nextProps.tradingTimesWorkspace !== this.props.tradingTimesWorkspace;
	}

	changeSubmarket() {

	}

	render() {
		const {assets, tradingTimesWorkspace} = this.props;
		const {times, list} = assets.toJS();
		const submarket = tradingTimesWorkspace.get('submarket');
		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket_display_name;

		return (
			<div>
				<div className="row">
					<MarketSelector
						onChange={x => this.changeSubmarket(x)}
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
