import React, { PureComponent } from 'react';
import { actions } from '../_store';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';

export default class WatchlistTable extends PureComponent {

	props: {
		activeTradeIdx: number,
		watchlistView: object,
	};

	onSelect = newAsset => {
		const { activeTradeIdx } = this.props;

		actions.getTradingOptions(newAsset);
		actions.updateTradeParams(activeTradeIdx, 'symbol', newAsset);
	}

	render() {
		const { watchlistView } = this.props;

		return (
			<table className="watchlist-table">
				<WatchlistTableHeader />
				<tbody>
					{watchlistView.map(x =>
						<WatchlistRow
							key={x.get('symbol')}
							item={x}
							onSelect={this.onSelect}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
