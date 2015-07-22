import React from 'react';
import TradingTimesRow from './TradingTimesRow';

export default class TradingTimesTable {

	render() {

        const times = [{}, {}, {}];

		return (
			<table>
				<thead>
                    <tr>
                        <th colSpan="100">
                            Major Pairs
                        </th>
                    </tr>
					<tr>
						<th>Asset</th>
						<th>Opens</th>
						<th>Closes</th>
                        <th>Settles</th>
                        <th>Upcoming Events</th>
					</tr>
				</thead>
				<tbody>
                    {times.map((t, i) => <TradingTimesRow key={i} time={t} />)}
				</tbody>
			</table>
		);
	}
}
