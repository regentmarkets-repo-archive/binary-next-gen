import React from 'react';
import { RadioGroup } from '../_common';
import { tradeTypes, digitMatchOptions } from '../_constants/TradeParams';

export default class TradeTypeSelector extends React.Component {

	static propTypes = {
		tickTrades: React.PropTypes.bool.isRequired,
		onChange: React.PropTypes.func,
	};

	render() {
		const {tickTrades} = this.props;
		const tickTradeTypes = tradeTypes.filter(x => !tickTrades || x.ticks);
		return (
			<div>
				<RadioGroup name="digit-match" options={digitMatchOptions} {...this.props}/>
				<RadioGroup name="trade-type" options={tickTradeTypes} {...this.props}/>
			</div>
		);
	}
}
