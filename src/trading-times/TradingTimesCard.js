import React, { PureComponent } from 'react';
import validate from 'validate.js/validate.min';
import { dateToDateString, todayLocaleString, oneYearAfterStr } from 'binary-utils';
import { ErrorMsg } from 'binary-components';
import { actions } from '../_store';
import MarketSubmarketPickerContainer from '../asset-picker/MarketSubmarketPickerContainer';
import TradingTimesTable from './TradingTimesTable';
import { getConstraints } from './TradingTimesCard.validation.config';

export default class TradingTimesCard extends PureComponent {

	props: {
		assets: Asset[],
		tradingTimes: any[],
		tradingTimesFilter: object,
	};

	constructor(props) {
		super(props);
		this.state = {
			errors: {},
		};
	}

	assetMatchFilter = (symbolName, filter) => {
		const { assets } = this.props;
		const assetObj = assets.find(x => x.symbol === symbolName);
		return assetObj ?
			(assetObj.market === filter || assetObj.submarket === filter) :
			null;
	}

	updateTradingTimes = (e: SyntheticEvent) => {
		const inputVal = e.target.value;
		this.setState({
			errors: validate({ trading_date: inputVal }, getConstraints(), {
				fullMessages: false,
				cleanAttributes: false
			}) || {},
		});
		if (this.state.errors !== undefined) {
			actions.updateTradingTimesDate(inputVal);
		}
	}

	render() {
		const { errors } = this.state;
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
				{ errors.trading_date && <ErrorMsg text={errors.trading_date[0]} /> }
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
