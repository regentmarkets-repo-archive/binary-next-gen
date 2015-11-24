import React from 'react';
import TradeTypeTickTradeOptions from './TradeTypeTickTradeOptions';
import TradeTypeRestOptions from './TradeTypeRestOptions';

export default class TradeTypeSelectorCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		isOnlyTickTrade: React.PropTypes.bool.isRequired,
		onChange: React.PropTypes.func,
		tickTrade: React.PropTypes.object.isRequired,
	};

	render() {
		const {actions, isOnlyTickTrade, tickTrade} = this.props;
		const {tradeSelection} = tickTrade.get('tradeType');
		const onChange = e => {
			actions.updateTickTradeParameters({ tradeType: e.target.value });
			// this.getPrice();
			window.console.log(e.target.value);
		};
		window.console.log(tradeSelection);
		return (
			<div>
				<TradeTypeTickTradeOptions onChange={onChange} />
				{isOnlyTickTrade || <TradeTypeRestOptions onChange={onChange} />}
			</div>
		);
	}
}
