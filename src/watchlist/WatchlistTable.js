import React, { PropTypes } from 'react';
import WatchlistRow from './WatchlistRow';
import M from '../_common/M';

const WatchlistTable = ({ assets, ticks, favorites }) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>
						<M m="Name" />
					</th>
					<th>
						<M m="Value" />
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
				{favorites.toSeq().map(symbol =>
					<WatchlistRow
						key={symbol}
						symbol={symbol}
						asset={assets.get('list').find(x => x.get('symbol') === symbol)}
						history={ticks.get(symbol)} />
				)}
			</tbody>
		</table>
	);
};

WatchlistTable.propTypes = {
	assets: PropTypes.object.isRequired,
	ticks: PropTypes.object.isRequired,
	favorites: PropTypes.object.isRequired,
};

export default WatchlistTable;
