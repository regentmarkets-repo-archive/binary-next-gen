import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import RangeGroup from '../_common/RangeGroup';

export default class BetterDurationCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
		onChange: PropTypes.func,
	};

	render() {
		const { actions, tickTrade } = this.props;
		return (
			<div>
				<input id="ticks" type="radio" name="duration" />
				<label htmlFor="ticks">
					<M m="Ticks" />
					<RangeGroup
						min={5} max={10}
						items={['5', '6', '7', '8', '9', '10']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</label>
				<input id="seconds" type="radio" name="duration" disabled />
				<label htmlFor="seconds">
					<M m="Seconds" />
					<RangeGroup
						min={10} max={60}
						items={['10', '20', '30', '40', '50', '60']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</label>
				<input id="minutes" type="radio" name="duration" disabled />
				<label htmlFor="minutes">
					<M m="Minutes" />
					<RangeGroup
						min={1} max={60}
						items={['1', '10', '20', '30', '40', '50', '60']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</label>
				<input id="hours" type="radio" name="duration" disabled />
				<label htmlFor="hours">
					<M m="Hours" />
					<RangeGroup
						min={1} max={24}
						items={['1', '6', '12', '18', '24']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</label>
				<input id="days" type="radio" name="duration" disabled />
				<label htmlFor="days">
					<M m="Days" />
					<RangeGroup
						min={1} max={365}
						items={['1', '10', '30', '60', '365']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</label>
			</div>
		);
	}
}
