import React, { PureComponent } from 'react';
import { dateToDateString, todayLocaleString, oneYearAfterStr } from 'binary-utils';
import { actions } from '../_store';
import MarketSubmarketPickerContainer from '../asset-picker/MarketSubmarketPickerContainer';
import TradingTimesTable from './TradingTimesTable';

export default class TradingTimesCard extends PureComponent {

	props: {
		assets: Asset[],
		tradingTimes: any[],
		tradingTimesFilter: object,
	};

	assetMatchFilter = (symbolName, filter) => {
		const { assets } = this.props;
		const assetObj = assets.find(x => x.symbol === symbolName);
		return assetObj ?
			(assetObj.market === filter || assetObj.submarket === filter) :
			null;
	}

	updateTradingTimes = (e: SyntheticEvent) => {
		const inputVal = e.target.value;
		if (/\d{4}-\d{1,2}-\d{1,2}/.test(inputVal) && inputVal.slice(0, 4) >= 1000) {
			actions.updateTradingTimesDate(inputVal);
		}
	}

	render() {
		const { tradingTimes, tradingTimesFilter } = this.props;
		const filter = tradingTimesFilter.filter;
		const tradingTimesDate = tradingTimesFilter.date;

		return (
			<div className="trading-times-card">
				<div className="trading-times-filter">
					<MarketSubmarketPickerContainer
						onChange={x => actions.updateTradingTimesFilter(x)}
						allOptionShown={false}
						value={filter}
					/>
					<input
						type="date"
						defaultValue={dateToDateString(tradingTimesDate)}
						min={todayLocaleString()}
						max={oneYearAfterStr()}
						className="trading-times-date-picker"
						onChange={this.updateTradingTimes}
						maxLength={10}
					/>
				</div>
				<div className="trading-times-data scrollable">
					<TradingTimesTable
						{...this.props}
						key={filter}
						times={tradingTimes.filter(a => this.assetMatchFilter(a.symbol, filter))}
					/>
				</div>
			</div>
		);
	}
}
