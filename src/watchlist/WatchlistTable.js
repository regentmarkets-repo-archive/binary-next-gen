import React, { PropTypes, Component } from 'react';
import WatchlistTableHeader from './WatchlistTableHeader';
import WatchlistRow from './WatchlistRow';

export default class WatchlistTable extends Component {

	static propTypes = {
		watchlistView: PropTypes.array.isRequired,
	};

	render() {
		const { watchlistView } = this.props;

		return (
			<table>
				<WatchlistTableHeader />
				<tbody>
					{watchlistView.map(x =>
						<WatchlistRow
							key={x.symbol}
							{...x}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
