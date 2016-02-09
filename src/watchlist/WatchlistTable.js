import React, { PropTypes } from 'react';
import WatchlistRow from './WatchlistRow';
import M from '../_common/M';

export default class WatchlistTable extends React.Component {

	static propTypes = {
		watchlistView: PropTypes.array.isRequired,
	};

	render() {
		const { watchlistView } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th></th>
						<th>
							<M m="Asset" />
						</th>
						<th>
							<M m="Spot" />
						</th>
						<th>
							<M m="Change" />
						</th>
						<th>
							<M m="Chart" />
						</th>
					</tr>
				</thead>
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
