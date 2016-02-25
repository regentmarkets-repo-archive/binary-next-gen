import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
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
					{ activeAsset.display_name }&nbsp;
					{activeAsset.exchange_is_open ?
						<span className="open-notice"><M m="Open" /></span> :
						<span className="closed-notice"><M m="Closed" /></span>
					}
				</h5>
				{ activeAsset.is_trading_suspended ? <M m="Trading is suspended" /> : null } <br />
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
