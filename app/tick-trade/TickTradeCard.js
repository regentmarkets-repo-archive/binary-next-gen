import React from 'react';
import { Link } from 'react-router';
import { RangeGroup } from '../common';
import TickSparkline from '../watchlist/TickSparkline';
import LiveData from '../_data/LiveData';
import TickTradeType from './TickTradeType';

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
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	getPrice(tickTrade) {
		const liveData = new LiveData();

		liveData.api.unsubscribeFromAllProposals();

		liveData.api.subscribeToPriceForContractProposal({
  			amount: tickTrade.get('amount'),
			basis: tickTrade.get('basis'),
			contract_type: tickTrade.get('contractType'),
			currency: tickTrade.get('currency'),
			duration: tickTrade.get('duration'),
			duration_unit: 't',
			symbol: tickTrade.get('assetSymbol'),
		});
	}
	placeOrder(tickTrade) {
		const liveData = new LiveData();

		liveData.api.buyContract(tickTrade.get('id'), tickTrade.get('ask_price'));
	}

	render() {
		const {actions, assets, tickTrade, workspace} = this.props;

		const selectedAssetName = () => {
			const asset = assets.get('list').find(x =>
				x.get('symbol') === workspace.get('symbolSelected'));

			return asset ? asset.get('display_name') : '';
		};

		return (
			<div>
				{JSON.stringify(tickTrade.get('proposal'))}
				<fieldset>
					<TickSparkline width={344} height={120} history={testHistory} />
				</fieldset>
				<div className="row">
					<label>Asset</label>
					<fieldset style={{flex: 3}}>
						<Link to={'/asset-selector?goback'} className="button">{selectedAssetName()}</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>Trade Type</label>
					<fieldset style={{flex: 3}}>
						<TickTradeType
							value={tickTrade.get('contractType')}
							onChange={e => actions.updateTickTradeParameters({ contractType: e.target.value })} />
					</fieldset>
				</div>
				<div className="row">
					<label>No. ticks:</label>
					<fieldset style={{flex: 3}}>
						<RangeGroup
							min={5} max={10}
							items={['5', '6', '7', '8', '9', '10']}
							value={tickTrade.get('duration')}
							onChange={e => actions.updateTickTradeParameters({ duration: +e.target.value })} />
					</fieldset>
				</div>
				<div className="row">
					<label>Amount</label>
					<fieldset style={{flex: 3}}>
						<button>Payout: {tickTrade.get('currency')} {tickTrade.get('amount')}</button>
					</fieldset>
				</div>
				<fieldset>
					<Link to={'/asset-selector'} className="soft-btn">{selectedAssetName()}</Link>
					&nbsp;will&nbsp;
					<Link to="/trade-type-selector" className="soft-btn">{tickTrade.get('contractType')}</Link>
					&nbsp;over&nbsp;next&nbsp;
					<Link to="/duration-selector" className="soft-btn">{tickTrade.get('duration')} ticks</Link>
				</fieldset>
				<fieldset>
					<label>Price: {tickTrade.get('currency')} {tickTrade.get('ask_price')}</label>
					<br/>
					<button className="buy-btn" onClick={() => this.getPrice(tickTrade)}>Get Price</button>
					<button className="buy-btn" onClick={() => this.placeOrder(tickTrade)}>Place Order</button>
				</fieldset>
			</div>
		);
	}
}
