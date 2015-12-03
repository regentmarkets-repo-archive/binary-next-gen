import React from 'react';
import WatchlistRow from './WatchlistRow';
import { FormattedMessage } from 'react-intl';

const WatchlistTable = ({assets, compact, ticks, favorites}) => {
	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>
						<FormattedMessage
							id="name"
							description=""
							defaultMessage="Name"
							/>
					</th>
					<th>
						<FormattedMessage
							id="value"
							description=""
							defaultMessage="Value"
							/>
					</th>
					{!compact && <th>
						<FormattedMessage
							id="updated"
							description=""
							defaultMessage="Updated"
							/>
					</th>}
					<th>
						<FormattedMessage
							id="change"
							description=""
							defaultMessage="Change"
							/>
					</th>
					<th>
						<FormattedMessage
							id="chart"
							description=""
							defaultMessage="Chart"
							/>
					</th>
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
