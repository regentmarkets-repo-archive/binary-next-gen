import React from 'react';
import WatchlistRow from './WatchlistRow';

const WatchlistTable = ({ticks, assets}) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Value</th>
					<th>Updated</th>
					<th>Change</th>
					<th>Chart</th>
				</tr>
			</thead>
			<tbody>
				{ticks.keySeq().map((symbol) =>
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
	ticks: React.PropTypes.object.isRequired,
	assets: React.PropTypes.object.isRequired,
};

export default WatchlistTable;
