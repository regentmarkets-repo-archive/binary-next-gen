import React from 'react';
import { Modal } from '../common';
import TickTradeSparkline from '../watchlist/TickTradeSparkline';
import LiveData from '../_data/LiveData';
import TickTradeParameters from './TickTradeParameters';
import TradeDisplay from './TradeDisplay';
import PurchaseConfirmation from './PurchaseConfirmation';

export default class TickTradeCard extends React.Component {

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		tickTrade: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

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
		const {actions, assets, tickTrade, workspace} = this.props;
		const history = this.getTickHistory();
		const spot = history[history.length - 1].quote;
		const diff = history.length > 1 ? history[history.length - 1].quote - history[history.length - 2].quote : 0;
		const receipt = tickTrade.get('receipt');
		const assetName = this.getSelectedAssetName() || '...';

		return (
			<div className="tick-trade-mobile">
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
				<TickTradeParameters
					actions={actions}
					assetName={assetName}
					assets={assets}
					tickTrade={tickTrade}
					workspace={workspace} />
				<TradeDisplay
					assets={assets}
					assetName={assetName}
					diff={diff}
					spot={spot}
					tickTrade={tickTrade}
					workspace={workspace} />
				<div>
					<button className="buy-btn" onClick={() => this.placeOrder()}>Place Order</button>
				</div>
			</div>
		);
	}
}
