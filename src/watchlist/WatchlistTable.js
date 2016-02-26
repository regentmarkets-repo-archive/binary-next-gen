import React, { PropTypes, Component } from 'react';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';

export default class WatchlistTable extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		watchlistView: PropTypes.array.isRequired,
	};

	render() {
		const { actions, watchlistView } = this.props;

		return (
			<table>
				<WatchlistTableHeader />
				<tbody>
					{watchlistView.map(x =>
						<WatchlistRow
							key={x.symbol}
							{...x}
							onSelect={symbol => actions.changeSelectedAsset(symbol)}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
