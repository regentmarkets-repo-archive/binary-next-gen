import React from 'react';
import { RadioGroup } from '../common';
import tradeTypes from '../_constants/tradeTypes';

export default class TickTradeType extends React.Component {
	render() {
		const tickTradeTypes = tradeTypes.filter(x => x.ticks);
		return (
			<RadioGroup name="trade-type" options={tickTradeTypes} {...this.props}/>
		);
	}
}
