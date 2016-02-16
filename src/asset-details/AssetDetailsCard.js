import React, { PropTypes } from 'react';
import M from '../_common/M';
import AssetDetailsDurations from './AssetDetailsDurations';
import AssetDetailsTradingTimes from './AssetDetailsTradingTimes';
import AssetDetailsTradingEvents from './AssetDetailsTradingEvents';

export default class AssetDetailsCard extends React.Component {

	static propTypes = {
		activeAsset: PropTypes.object,
		tradingTimes: PropTypes.object,
	};

	render() {
		const { activeAsset, tradingTimes } = this.props;

		if (!activeAsset) return null;

		return (
			<div>
				<h5>
					{ activeAsset.display_name } ({ activeAsset.exchange_is_open ? <M m="open" /> : <M m="closed" />})
				</h5>
				{ activeAsset.is_trading_suspended ? <M m="Trading is suspended" /> : null } <br />
				<h5><M m="Trading Times" /></h5>
				{tradingTimes && <AssetDetailsTradingTimes times={tradingTimes.times} />}
				{tradingTimes && tradingTimes.events.length > 0 &&
					<div>
						<h5><M m="Trading Events" /></h5>
						<AssetDetailsTradingEvents events={tradingTimes.events} />
					</div>
				}
				<br />
				<h5><M m="Durations" /></h5>
				<AssetDetailsDurations />
			</div>
		);
	}
}
