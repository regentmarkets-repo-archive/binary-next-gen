import React, { PureComponent } from 'react';
import { M } from 'binary-components';
import AssetDetailsDurations from './AssetDetailsDurations';
import AssetDetailsTradingTimes from './AssetDetailsTradingTimes';
import AssetDetailsTradingEvents from './AssetDetailsTradingEvents';

export default class AssetDetailsCard extends PureComponent {

	props: {
		durations: any[],
		tradingTimes: object,
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
			<div className="asset-details scrollable">
				<h5><M m="Trading Times" /></h5>
				<AssetDetailsTradingTimes times={tradingTimes.times} />
				{tradingTimes.events.length > 0 &&
					<div>
						<h5><M m="Trading Events" /></h5>
						<AssetDetailsTradingEvents events={tradingTimes.events} />
					</div>
				}
				<h5><M m="Durations" /></h5>
				<AssetDetailsDurations durations={durations} />
			</div>
		);
	}
}
