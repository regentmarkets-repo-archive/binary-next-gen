import React from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../_common';
import { tradeTypeCodeToText } from '../_utils/TradeUtils';

export default class TickTradeParameters extends React.Component {
	static propTypes = {
		assetName: React.PropTypes.string.isRequired,
		actions: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	componentDidMount() {
		this.props.actions.updateTickTradeParameters({ duration: 5 });
		this.getPrice(this.props.tickTrade);
	}

	getPrice(tickTrade) {
		this.props.actions.getPriceProposal(tickTrade);
	}

	render() {
		const {actions, assetName, tickTrade} = this.props;
		const tradeTypeText = tradeTypeCodeToText(tickTrade.get('tradeType'));

		return (
			<div>
				<div className="row">
					<label>Asset</label>
					<fieldset style={{flex: 4}}>
						<Link to={'/asset-selector?goback&tick'} className="button">
							{assetName}
						</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>Type</label>
					<fieldset style={{flex: 4}}>
						<Link
							className="button"
							to="/trade-type-selector">
							{tradeTypeText}
						</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>Ticks</label>
					<div style={{flex: 4}}>
						<RangeGroup
							min={5} max={10}
							items={['5', '6', '7', '8', '9', '10']}
							value={+tickTrade.get('duration')}
							onChange={e => {
								actions.updateTickTradeParameters({ duration: e.target.value });
								this.getPrice(tickTrade);
							}} />
					</div>
				</div>
				<div className="row">
					<label>Amount</label>
					<fieldset style={{flex: 4}}>
						<Link
							className="button"
							to="/payout-selector">
							{tickTrade.get('basis')}: {tickTrade.get('currency')} {tickTrade.get('amount')}
						</Link>
					</fieldset>
				</div>
			</div>
		);
	}
}
