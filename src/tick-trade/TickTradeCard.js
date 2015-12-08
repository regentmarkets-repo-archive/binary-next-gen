import React, { PropTypes } from 'react';
import { Modal } from '../_common';
import TickTradeSparkline from '../watchlist/TickTradeSparkline';
import * as LiveData from '../_data/LiveData';
import TickTradeParameters from './TickTradeParameters';
import TradeDisplay from './TradeDisplay';
import PurchaseConfirmation from './PurchaseConfirmation';
import PurchaseFailed from './PurchaseFailed';
import M from '../_common/M';

export default class TickTradeCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = { failure: null, buying: false };
	}

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		tickTrade: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	getPriceProposal() {
		const { tickTrade, actions } = this.props;
		actions.getPriceProposal(tickTrade);
	}

	placeOrder() {
		const { tickTrade } = this.props;
		this.setState({ buying: true });
		const buyAttempt = LiveData.api.buyContract(tickTrade.get('id'), tickTrade.get('ask_price'));
		buyAttempt.then(
			receipt => {
				this.props.actions.serverDataBuy(receipt);
				this.setState({ buying: false });
			},
			err => {
				this.setState({
					failure: err,
					buying: false,
				});
			}
		).then(() => this.getPriceProposal());
	}

	getTickHistory() {
		const { tickTrade } = this.props;
		return tickTrade.get('ticks').toJS();
	}

	getSelectedAssetName() {
		const { assets, workspace } = this.props;
		const asset = assets.get('list').find(x =>
			x.get('symbol') === workspace.get('symbolSelected'));

		return asset ? asset.get('display_name') : '';
	}

	componentDidMount() {
		this.getPriceProposal();
	}

	render() {
		const { actions, assets, tickTrade, workspace } = this.props;
		const history = this.getTickHistory();
		const spot = history.length > 0 ? history[history.length - 1].quote : null;
		const diff = history.length > 1 ? history[history.length - 1].quote - history[history.length - 2].quote : 0;
		const receipt = tickTrade.get('receipt');
		const assetName = this.getSelectedAssetName() || '...';

		return (
			<div className="tick-trade-mobile">
				<Modal shown={!!this.state.failure}
					onClose={() => this.setState({ failure: null })}>
					<PurchaseFailed failure={this.state.failure} />
				</Modal>
				<Modal shown={!!receipt}
					onClose={() => actions.discardPurchaseReceipt()}>
					<PurchaseConfirmation receipt={receipt} />
				</Modal>
				<TickTradeSparkline
					history={history}
					showBarrier={tickTrade.get('tradeType') === 'CALL'}
					spot={spot} />
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
				<button
					className="buy-btn"
					onClick={() => this.placeOrder()}
					disabled={this.state.buying}>
					<M m="Place Order" />
				</button>
			</div>
		);
	}
}
