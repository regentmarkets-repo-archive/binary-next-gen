import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import RangeGroup from '../_common/RangeGroup';

export default class TickDurationCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
		onChange: PropTypes.func,
	};

	render() {
		const { actions, tickTrade } = this.props;
		return (
			<div>
				<fieldset>
					<label>
						<M m="Scale" />
					</label>
					<RangeGroup
						min={1} max={5}
						items={['Ticks', 'Seconds', 'Minutes', 'Hours', 'Days']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</fieldset>
				<fieldset>
					<label>
						<M m="Ticks" />
					</label>
					<RangeGroup
						min={5} max={10}
						items={['5', '6', '7', '8', '9', '10']}
						value={+tickTrade.get('duration')}
						onChange={e => {
							actions.updateTickTradeParameters({ duration: e.target.value });
							this.getPrice();
						}}
					/>
				</fieldset>
			</div>
		);
	}
}
