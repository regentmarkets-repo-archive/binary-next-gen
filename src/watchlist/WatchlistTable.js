import React, { PropTypes, Component } from 'react';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class WatchlistTable extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		activeTradeIdx: PropTypes.number.isRequired,
		watchlistView: PropTypes.object.isRequired,
		selectedAsset: PropTypes.string.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onSelect = newAsset => {
		const { actions, activeTradeIdx } = this.props;

		actions.changeSelectedAsset(newAsset);
		actions.getTradingOptions(newAsset);
		actions.updateTradeParams(activeTradeIdx, 'symbol', newAsset);
	}

	render() {
		const { watchlistView } = this.props;

		return (
			<table>
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
