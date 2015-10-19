import React from 'react';
import { Link } from 'react-router';
import { RangeGroup, Modal } from '../common';
import TickTradeSparkline from '../watchlist/TickTradeSparkline';
import LiveData from '../_data/LiveData';
import TickTradeType from './TickTradeType';
import PurchaseConfirmation from './PurchaseConfirmation';

export default class TickTradeCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	getPrice() {
		const liveData = new LiveData();
		const {tickTrade} = this.props;

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

	placeOrder() {
		const liveData = new LiveData();
		const {tickTrade} = this.props;
		liveData.api.buyContract(tickTrade.get('id'), tickTrade.get('ask_price'));
	}

	getTickHistory() {
		const {tickTrade} = this.props;
		return tickTrade.get('ticks').toJS();
	}

	getSelectedAssetName() {
		const {assets, workspace} = this.props;
		const asset = assets.get('list').find(x =>
			x.get('symbol') === workspace.get('symbolSelected'));

		return asset ? asset.get('display_name') : '';
	}

	render() {
		const {actions, tickTrade} = this.props;
		const history = this.getTickHistory();
		const spot = history[history.length - 1].quote;
		const receipt = tickTrade.get('receipt');

		return (
			<div>
				<Modal shown={receipt}
					onClose={() => actions.discardPurchaseReceipt()}>
					<PurchaseConfirmation receipt={receipt} />
				</Modal>
				<fieldset>
					<TickTradeSparkline
						width={344}
						height={120}
						history={history}
						isCall={tickTrade.get('contractType') === 'CALL'}
						spot={spot} />
				</fieldset>
				<div className="row">
					<label>Asset</label>
					<fieldset style={{flex: 4}}>
						<Link to={'/asset-selector?goback&tick'} className="button">
							{this.getSelectedAssetName() || '...'}
						</Link>
					</fieldset>
				</div>
				<div className="row">
					<label>Type</label>
					<fieldset style={{flex: 4}}>
						<TickTradeType
							value={tickTrade.get('contractType')}
							onChange={e => actions.updateTickTradeParameters({ contractType: e.target.value })} />
					</fieldset>
				</div>
				<div className="row">
					<label>Ticks</label>
					<div style={{flex: 4}}>
						<RangeGroup
							min={5} max={10}
							items={['5', '6', '7', '8', '9', '10']}
							value={tickTrade.get('duration')}
							onChange={e => actions.updateTickTradeParameters({ duration: +e.target.value })} />
					</div>
				</div>
				<div className="row">
					<label>Amount</label>
					<fieldset style={{flex: 4}}>
						<button>Payout: {tickTrade.get('currency')} {tickTrade.get('amount')}</button>
					</fieldset>
				</div>
				<div style={{ background: 'rgba(42, 48, 82, .1)', borderRadius: 2, padding: '.5rem .25rem .25rem .25rem', marginBottom: '1rem'}}>
					<div>
						<Link to={'/asset-selector?goback&tick'} className="soft-btn">{this.getSelectedAssetName()}</Link>
						&nbsp;will&nbsp;
						<Link to="/trade-type-selector" className="soft-btn">{tickTrade.get('contractType')}</Link>
						&nbsp;over&nbsp;next&nbsp;
						<Link to="/duration-selector" className="soft-btn">{tickTrade.get('duration')} ticks</Link>
					</div>
					<div className="row" style={{ fontSize: '1.4rem' }}>
						<label>Spot: {spot}</label><label>Price: {tickTrade.get('currency')} {tickTrade.get('ask_price')}</label>
					</div>
				</div>

				<div>
					<button className="buy-btn" onClick={() => this.getPrice()}>Get Price</button>
					<button className="buy-btn" onClick={() => this.placeOrder()}>Place Order</button>
				</div>
			</div>
		);
	}
}
