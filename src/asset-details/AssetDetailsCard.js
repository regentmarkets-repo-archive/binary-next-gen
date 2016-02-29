import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import OpenCloseNotice from '../_common/OpenCloseNotice';
import AssetDetailsDurations from './AssetDetailsDurations';
import AssetDetailsTradingTimes from './AssetDetailsTradingTimes';
import AssetDetailsTradingEvents from './AssetDetailsTradingEvents';

export default class AssetDetailsCard extends Component {

	static propTypes = {
		activeAsset: PropTypes.object,
		durations: PropTypes.array,
		tradingTimes: PropTypes.object,
	};

	render() {
		const { activeAsset, durations, tradingTimes } = this.props;

		if (!activeAsset) return null;

		return (
			<div>
				<h5>
					{ activeAsset.name }&nbsp;
					<OpenCloseNotice isOpen={activeAsset.isOpen} />
				</h5>
				<h5><M m="Trading Times" /></h5>
				{tradingTimes && <AssetDetailsTradingTimes times={tradingTimes.times} />}
				<br />
				{tradingTimes && tradingTimes.events.length > 0 &&
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
