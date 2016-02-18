import React, { PropTypes, Component } from 'react';
import M from '../_common/M';
import TradingTimesRow from './TradingTimesRow';

export default class TradingTimesTable extends Component {

	static propTypes = {
		times: PropTypes.array.isRequired,
		compact: PropTypes.bool,
	};

	render() {
		const { times, compact } = this.props;

		return (
			<table>
				<thead>
					<tr>
						<th><M m="Asset" /></th>
						<th><M m="Opens" /></th>
						<th><M m="Closes" /></th>
						<th><M m="Settles" /></th>
						{!compact && <th><M m="Upcoming Events" /></th>}
					</tr>
				</thead>
				<tbody>
					{times.map(t =>
						<TradingTimesRow
							key={t.symbol}
							assetName={t.name}
							times={t.times}
							events={t.events}
							compact={compact}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
