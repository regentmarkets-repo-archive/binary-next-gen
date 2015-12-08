import React, { PropTypes } from 'react';
import { DirectionAndValue } from '../_common';
import { tradeToFriendlyType } from '../_utils/TradeUtils';

export default class TickTradeDisplay extends React.Component {

	static propTypes = {
		assetName: PropTypes.string.isRequired,
		assets: PropTypes.object.isRequired,
		diff: PropTypes.number,
		spot: PropTypes.any,
		tickTrade: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { assetName, diff, spot, tickTrade } = this.props;

		return (
			<div style={{ background: 'rgba(42, 48, 82, .1)', borderRadius: 2, padding: '.5rem .25rem .25rem .25rem', marginBottom: '1rem' }}>
				<div>
					<strong>{assetName}</strong>
					<span> will </span>
					<strong>{tradeToFriendlyType(tickTrade.get('tradeType'), tickTrade.get('barrier'))}</strong>
					<span> over next </span>
					<strong>{tickTrade.get('duration')} ticks</strong>
				</div>
				<div className="row">
					<label>Spot: {spot ? <DirectionAndValue diff={diff} value={spot} /> : <span></span>}</label>
					<label>Price: {tickTrade.get('currency')} {tickTrade.get('ask_price')}</label>
				</div>
			</div>
		);
	}
}
