import React from 'react';
import { RadioGroup } from '../_common';
import tradeTypes from '../_constants/tradeTypes';

export default class TradeTypeSelector extends React.Component {

	static propTypes = {
		tickTrades: React.PropTypes.bool.isRequired,
		onChange: React.PropTypes.func,
	};

	render() {
		const {tickTrades} = this.props;
		const tickTradeTypes = tradeTypes.filter(x => !tickTrades || x.ticks);
		return (
			<RadioGroup name="trade-type" options={tickTradeTypes} {...this.props}/>
		);
	}
}
