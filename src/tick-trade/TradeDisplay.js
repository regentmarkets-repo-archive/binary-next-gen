import React from 'react';
import { Link } from 'react-router';
import { DirectionAndValue } from '../_common';

export default class TickTradeDisplay extends React.Component {

	static propTypes = {
		assetName: React.PropTypes.string.isRequired,
		assets: React.PropTypes.object.isRequired,
		diff: React.PropTypes.number.isRequired,
		spot: React.PropTypes.any.isRequired,
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	render() {
		const {assetName, diff, spot, tickTrade} = this.props;

		return (
			<div style={{ background: 'rgba(42, 48, 82, .1)', borderRadius: 2, padding: '.5rem .25rem .25rem .25rem', marginBottom: '1rem'}}>
				<div>
					<Link to={'/asset-selector?goback&tick'} className="soft-btn">{assetName}</Link>
					&nbsp;will&nbsp;
					<Link to="/trade-type-selector" className="soft-btn">{tickTrade.get('tradeType')}</Link>
					&nbsp;over&nbsp;next&nbsp;
					<Link to="/duration-selector" className="soft-btn">{tickTrade.get('duration')} ticks</Link>
				</div>
				<div className="row" style={{ fontSize: '1.2rem' }}>
					<label>Spot: <DirectionAndValue diff={diff} value={spot} /></label><label>Price: {tickTrade.get('currency')} {tickTrade.get('ask_price')}</label>
				</div>
			</div>
		);
	}
}
