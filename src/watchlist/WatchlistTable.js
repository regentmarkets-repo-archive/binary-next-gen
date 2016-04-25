import React, { PropTypes, Component } from 'react';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';

export default class WatchlistTable extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		activeTradeIdx: PropTypes.number.isRequired,
		watchlistView: PropTypes.array.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	onSelect(newAsset) {
		const { actions, activeTradeIdx } = this.props;

		actions.changeSelectedAsset(newAsset);
		actions.getTradingOptions(newAsset);
		actions.updateTradeParams(activeTradeIdx, 'symbol', newAsset);
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
							onSelect={::this.onSelect}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
