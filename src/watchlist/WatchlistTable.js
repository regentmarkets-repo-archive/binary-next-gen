import React, { PropTypes } from 'react';
import WatchlistRow from './WatchlistRow';
import M from '../_common/M';

const WatchlistTable = ({ assets, ticks, watchlist }) => (
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
			{watchlist.toSeq().map(symbol =>
				<WatchlistRow
					key={symbol}
					symbol={symbol}
					asset={assets.find(x => x.get('symbol') === symbol)}
					history={ticks.get(symbol)}
				/>
			)}
		</tbody>
	</table>
);

WatchlistTable.propTypes = {
	assets: PropTypes.object.isRequired,
	ticks: PropTypes.object.isRequired,
	watchlist: PropTypes.object.isRequired,
};

export default WatchlistTable;
