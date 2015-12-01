import React from 'react';
import { DirectionAndValue } from '../_common';
import { tradeTypeCodeToText } from '../_utils/TradeUtils';

export default class TickTradeDisplay extends React.Component {

	static propTypes = {
		assetName: React.PropTypes.string.isRequired,
		assets: React.PropTypes.object.isRequired,
		diff: React.PropTypes.number,
		spot: React.PropTypes.any,
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	render() {
		const {assetName, diff, spot, tickTrade} = this.props;

		return (
			<div style={{ background: 'rgba(42, 48, 82, .1)', borderRadius: 2, padding: '.5rem .25rem .25rem .25rem', marginBottom: '1rem'}}>
				<div>
					<strong>{assetName}</strong>
					&nbsp;will&nbsp;
					<strong>{tradeTypeCodeToText(tickTrade.get('tradeType'))}</strong>
					&nbsp;over&nbsp;next&nbsp;
					<strong>{tickTrade.get('duration')}&nbsp;ticks</strong>
				</div>
				<div className="row">
					<label>Spot: {spot ? <DirectionAndValue diff={diff} value={spot} /> : <span></span>}</label>
					<label>Price: {tickTrade.get('currency')} {tickTrade.get('ask_price')}</label>
				</div>
			</div>
		);
	}
}
