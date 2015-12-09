import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../_common';
import { tradeToFriendlyType } from '../_utils/TradeUtils';
import { M, NumberPlain } from '../_common';

export default class TickTradeParameters extends React.Component {
	static propTypes = {
		assetName: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	getPrice() {
		const { actions, tickTrade } = this.props;
		actions.getPriceProposal(tickTrade);
	}

	componentDidMount() {
		this.getPrice();
	}

	render() {
		const { actions, assetName, tickTrade } = this.props;
		const tradeTypeText = tradeToFriendlyType(tickTrade.get('tradeType'), tickTrade.get('barrier'));

		return (
			<div>
				<div className="row">
					<label>
						<M m="Asset" />
					</label>
					<fieldset style={{ flex: 4 }}>
						<Link to={'/asset-selector?goback&tick'} className="button">
							{assetName}
						</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>
						<M m="Type" />
					</label>
					<fieldset style={{ flex: 4 }}>
						<Link
							className="button"
							to="/trade-type-selector">
							<M m={tradeTypeText} />
						</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>
						<M m="Ticks" />
					</label>
					<div style={{ flex: 4 }}>
						<RangeGroup
							min={5} max={10}
							items={['5', '6', '7', '8', '9', '10']}
							value={+tickTrade.get('duration')}
							onChange={e => {
								actions.updateTickTradeParameters({ duration: e.target.value });
								this.getPrice();
							}} />
					</div>
				</div>
				<div className="row">
					<label>
						<M m="Amount" />
					</label>
					<fieldset style={{ flex: 4 }}>
						<Link
							className="button"
							to="/payout-selector">
							<M m={tickTrade.get('basis')} /><span>: </span>
							<NumberPlain currency={tickTrade.get('currency')} value={tickTrade.get('amount')} />
						</Link>
					</fieldset>
				</div>
			</div>
		);
	}
}
