import React, { PropTypes, PureComponent } from 'react';
import { M } from 'binary-components';
import AssetDetailsDurations from './AssetDetailsDurations';
import AssetDetailsTradingTimes from './AssetDetailsTradingTimes';
import AssetDetailsTradingEvents from './AssetDetailsTradingEvents';

export default class AssetDetailsCard extends PureComponent {

	static propTypes = {
		activeAsset: PropTypes.object.isRequired,
		durations: PropTypes.array,
		tradingTimes: PropTypes.object,
	};

	static defaultProps = {
		durations: [undefined, undefined, []],
		tradingTimes: {
			times: {
				open: [],
				close: [],
			},
			events: [],
		},
	};

	render() {
		const { durations, tradingTimes } = this.props;

		return (
			<div className="asset-details">
				<h5><M m="Trading Times" /></h5>
				<AssetDetailsTradingTimes times={tradingTimes.times} />
				<br />
				{tradingTimes.events.length > 0 &&
					<div>
						<h5><M m="Trading Events" /></h5>
						<AssetDetailsTradingEvents events={tradingTimes.events} />
					</div>
				}
				<br />
				<h5><M m="Durations" /></h5>
				<AssetDetailsDurations durations={durations} />
			</div>
		);
	}
}
