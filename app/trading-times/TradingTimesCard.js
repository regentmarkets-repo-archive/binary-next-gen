import React from 'react';
import { InputGroup, MarketSubmarketSelector } from '../common';
import TradingTimesTable from './TradingTimesTable';
import { todayStr, oneYearAgoStr } from '../common/DateUtils';

// const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export default class TradingTimesCard extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		tradingTimesWorkspace: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		window.console.log(nextProps.assets !== this.props.assets, nextProps.tradingTimesWorkspace !== this.props.tradingTimesWorkspace);

		return nextProps.assets !== this.props.assets && nextProps.tradingTimesWorkspace !== this.props.tradingTimesWorkspace;
	}

	changeSubmarket() {

	}

	render() {
		const {assets, tradingTimesWorkspace} = this.props;
		const {tree, times, list} = assets.toJS();
		const submarket = tradingTimesWorkspace.get('submarket');
		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket_display_name;

		return (
			<div>
				<div className="row">
					<MarketSubmarketSelector
						tree={tree}
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


// TradingTimesCard.
