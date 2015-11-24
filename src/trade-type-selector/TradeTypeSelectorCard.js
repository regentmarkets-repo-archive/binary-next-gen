import React from 'react';
import TradeTypeTickOptions from './TradeTypeTickOptions';
import TradeTypeRestOptions from './TradeTypeRestOptions';

export default class TradeTypeSelectorCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		isOnlyTickTrade: React.PropTypes.bool,
		onChange: React.PropTypes.func,
		tickTrade: React.PropTypes.object.isRequired,
	};

	render() {
		const {actions, isOnlyTickTrade, tickTrade} = this.props;
		const {tradeSelection} = tickTrade.get('tradeType');
		const onChange = e => {
			actions.updateTickTradeParameters({ tradeType: e.target.value });
			window.console.log(e.target.value);
		};
		window.console.log(tradeSelection);
		return (
			<div>
				<TradeTypeTickOptions onChange={onChange} />
				{isOnlyTickTrade && <TradeTypeRestOptions onChange={onChange} />}
			</div>
		);
	}
}
