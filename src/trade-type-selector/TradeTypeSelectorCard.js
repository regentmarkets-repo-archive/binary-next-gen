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
		const {actions, isOnlyTickTrade} = this.props;

		const onChange = e => {
			actions.updateTickTradeParameters({ tradeType: e.target.value });
		};

		return (
			<div>
				<TradeTypeTickOptions onChange={onChange} />
				{isOnlyTickTrade && <TradeTypeRestOptions onChange={onChange} />}
			</div>
		);
	}
}
