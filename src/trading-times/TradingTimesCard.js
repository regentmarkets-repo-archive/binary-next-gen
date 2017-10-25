import React, { PureComponent } from 'react';
import moment from 'moment';
import validate from 'validate.js/validate.min';
import head from 'lodash.head';
import { dateToDateString, todayLocaleString, oneYearAfterStr } from 'binary-utils';
import { ErrorMsg } from 'binary-components';
import { actions } from '../_store';
import MarketSubmarketPickerContainer from '../asset-picker/MarketSubmarketPickerContainer';
import TradingTimesTable from './TradingTimesTable';

validate.extend(validate.validators.datetime, {
	parse: (v) => +moment.utc(v),
	format: (v) => moment.utc(v).format('YYYY-MM-DD'),
});

export default class TradingTimesCard extends PureComponent {

	props: {
		assets: Asset[],
		tradingTimes: any[],
		tradingTimesFilter: object,
	};

	constructor(props) {
		super(props);
		this.state = {
			errors: undefined,
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
		const START_TIME_TXT = 'Start time is in the past.';
		const constraints = {
			trading_date: {
				date: {
					earliest: moment(todayLocaleString()),
					latest: moment(oneYearAfterStr()),
					tooEarly: START_TIME_TXT,
					notValid: START_TIME_TXT,
					tooLate: 'Start time cannot be more than 1 year.'
				},
			}
		};
		const inputVal = e.target.value;
		this.setState({
			errors: validate({ trading_date: inputVal }, constraints, {
				fullMessages: false,
				cleanAttributes: false
			}),
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
				<ErrorMsg text={head((errors || {}).trading_date)} />
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
