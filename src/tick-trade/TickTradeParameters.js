import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';
import { RangeGroup } from '../_common';
import { tradeToFriendlyType } from '../_utils/TradeUtils';
import { M, NumberPlain } from '../_common';

export default class TickTradeParameters extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assetName: PropTypes.string.isRequired,
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
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
			<div className="trade-parameters">
				<div className="row">
					<fieldset>
						<label>
							<M m="Asset" />
						</label>
						<br />
						<Link to={'/asset-selector?goback&tick'} className="btn-secondary">
							{assetName}
						</Link>
					</fieldset>
					<fieldset>
						<label>
							<M m="Type" />
						</label>
						<br />
						<Link
							className="btn-secondary"
							to="/trade-type-selector"
						>
							<M m={tradeTypeText} />
						</Link>
					</fieldset>
				</div>
				<div className="row" style={{ marginTop: '1rem' }}>
					<fieldset>
						<label>
							<M m="Ticks" />
						</label>
						<RangeGroup
							min={5} max={10}
							items={['5', '6', '7', '8', '9', '10']}
							value={+tickTrade.get('duration')}
							onChange={e => {
								actions.updateTickTradeParameters({ duration: e.target.value });
								this.getPrice();
							}}
						/>
					</fieldset>
					<fieldset>
						<label>
							<M m="Amount" />
						</label>
						<br />
						<Link
							className="btn-secondary"
							to="/payout-selector"
						>
							<M m={tickTrade.get('basis')} /><span>: </span>
							<NumberPlain currency={tickTrade.get('currency')} value={tickTrade.get('amount')} />
						</Link>
					</fieldset>
				</div>
			</div>
		);
	}
}
