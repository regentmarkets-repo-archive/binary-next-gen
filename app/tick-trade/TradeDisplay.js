import React from 'react';
import { Link } from 'react-router';
import LiveData from '../_data/LiveData';

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
  			amount: tickTrade.get('amount').toString(),
			basis: tickTrade.get('basis'),
			contract_type: tickTrade.get('contractType'),
			currency: tickTrade.get('currency'),
			duration: tickTrade.get('duration').toString(),
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
		const {tickTrade} = this.props;
		const history = this.getTickHistory();
		const spot = history[history.length - 1].quote;

		return (
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
		);
	}
}
