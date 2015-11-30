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

		const onChange = (key, val) => {
			const params = {};
			params[key] = val;
			actions.updateTickTradeParameters(params);
		};

		return (
			<div>
				<TradeTypeTickOptions
					onTypeChange={e => onChange('tradeType', e.target.value)}
					onBarrierChange={e => onChange('barrier', e.target.value)}
				/>
				{isOnlyTickTrade &&
					<TradeTypeRestOptions
						onTypeChange={e => onChange('tradeType', e.target.value)}
						onBarrierChange={e => onChange('barrier', e.target.value)}
					/>
				}
			</div>
		);
	}
}
