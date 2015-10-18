import React from 'react';
import WatchlistRow from './WatchlistRow';

const WatchlistTable = ({assets, compact, ticks}) => {
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
				{ticks.keySeq().map((symbol) =>
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
	compact: React.PropTypes.bool.isRequired,
	ticks: React.PropTypes.object.isRequired,
};

export default WatchlistTable;
