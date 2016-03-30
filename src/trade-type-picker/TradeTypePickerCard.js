import React, { PropTypes, Component } from 'react';
import TradeTypeTickOptions from './TradeTypeTickOptions';

export default class TradeTypePickerCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		params: PropTypes.object,
		tickOnly: PropTypes.bool,
		trades: PropTypes.object.isRequired,
	};

	onChange(name, value) {
		const { id } = this.props.params;
		this.props.actions.updateTradeParams(id, name, value);
	}

	render() {
		const { tickOnly, trades } = this.props;
		const { id } = this.props.params;
		const trade = trades[id];

		return (
			<TradeTypeTickOptions
				tickOnly={tickOnly}
				type={trade.type}
				barrier={trade.barrier}
				onTypeChange={e => this.onChange('type', e.target.value)}
				onBarrierChange={e => this.onChange('barrier', +e.target.value)}
			/>
		);
	}
}
