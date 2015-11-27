import React from 'react';
import WatchlistRow from './WatchlistRow';

const WatchlistTable = ({assets, compact, ticks, favorites}) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Value</th>
					{!compact && <th>Updated</th>}
					<th>Change</th>
					<th>Chart</th>
				</tr>
			</thead>
			<tbody>
				{favorites.toSeq().map( symbol =>
					<WatchlistRow
						key={symbol}
						compact={compact}
						symbol={symbol}
						asset={assets.get('list').find(x => x.get('symbol') === symbol)}
						history={ticks.get(symbol)} />
				)}
			</tbody>
		</table>
	);
};

WatchlistTable.propTypes = {
	assets: React.PropTypes.object.isRequired,
	compact: React.PropTypes.bool,
	ticks: React.PropTypes.object.isRequired,
	favorites: React.PropTypes.object.isRequired,
};

export default WatchlistTable;
