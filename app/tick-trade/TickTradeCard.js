import React from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../common';
import TickSparkline from '../watchlist/TickSparkline';
import LiveData from '../_data/LiveData';

const testHistory = [
	{quote: 10}, {quote: 50}, {quote: 20}, {quote: 10}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 10}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 30}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 60}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 20}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 10}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 40}, {quote: 50},
	{quote: 20}, {quote: 50}, {quote: 40}, {quote: 40}, {quote: 50},
];

export default class TickTradeCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	placeOrder() {
		const {workspace} = this.props;
		const liveData = new LiveData();
		liveData.api.subscribeToPriceForContractProposal({
  			amount: '100',
			basis: 'payout', // or stake
			contract_type: 'CALL', // or one of the other 3
			currency: 'USD', // should it be pickable?
			duration: '10', // tick amount
			duration_unit: 't',
			symbol: workspace.get('symbolSelected'),
		});
	}

	render() {
		const {workspace} = this.props;
		// const {actions, workspace, assets} = this.props;
		// actions.updateAssetSelectorMarkets(assets.get('list'), ['Indices', 'Randoms']);
		return (
			<div>
				<fieldset>
					<TickSparkline width={344} height={120} history={testHistory} />
				</fieldset>
				<div className="row">
					<label>Asset</label>
					<fieldset style={{flex: 2}}>
						<Link to={'/asset-selector'} className="button">{workspace.get('symbolSelected')}</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>Select Trade</label>
					<fieldset style={{flex: 2}}>
						<button>U</button><button>D</button><button>=</button><button>!=</button>
					</fieldset>
				</div>
				<div className="row">
					<label>No. ticks:</label>
					<fieldset style={{flex: 2}}>
						<RangeGroup min={5} max={10} items={['5', '6', '7', '8', '9', '10']} />
					</fieldset>
				</div>
				<div className="row">
					<label>Select Amount</label>
					<fieldset style={{flex: 2}}>
						<button>Payout: USD 20</button>
					</fieldset>
				</div>
				<fieldset>
					<Link to={'/asset-selector'} className="soft-btn">{workspace.get('symbolSelected')}</Link>
					&nbsp;will&nbsp;
					<Link to="/trade-type-selector" className="soft-btn">RISE</Link>
					&nbsp;over&nbsp;next&nbsp;
					<Link to="/duration-selector" className="soft-btn">5 ticks</Link>
				</fieldset>
				<fieldset>
					<label>Price: USD 7.1</label>
					<br/>
					<button className="buy-btn" onClick={() => this.placeOrder()}>Place Order</button>
				</fieldset>
			</div>
		);
	}
}
