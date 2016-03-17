import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';

export default class WatchlistTable extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		activeTradeIdx: PropTypes.number.isRequired,
		watchlistView: PropTypes.array.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	componentDidMount() {
		const focusedNode = findDOMNode(this.refs.focused);
		if (focusedNode) focusedNode.focus();
    }

	onSelect(newAsset) {
		const { actions, activeTradeIdx } = this.props;

		actions.changeSelectedAsset(newAsset);
		actions.getTradingOptions(newAsset);
		actions.updateTradeParams(activeTradeIdx, 'symbol', newAsset);
		actions.updatePriceProposalSubscription(activeTradeIdx);
	}

	render() {
		const { watchlistView, selectedAsset } = this.props;

		return (
			<table>
				<WatchlistTableHeader />
				<tbody>
					{watchlistView.map(x =>
						<WatchlistRow
							key={x.symbol}
							{...x}
							selected={selectedAsset === x.symbol}
							ref={selectedAsset === x.symbol ? 'focused' : null}
							onSelect={::this.onSelect}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
