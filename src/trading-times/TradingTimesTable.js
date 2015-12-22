import React, { PropTypes } from 'react';
import TradingTimesRow from './TradingTimesRow';

const TradingTimesTable = ({ submarket, times, compact }) => (
	<table>
		<thead>
            <tr>
				<th colSpan="100">
                    {submarket}
                </th>
            </tr>
			<tr>
				<th>Asset</th>
				<th>Opens</th>
				<th>Closes</th>
                <th>Settles</th>
				{!compact && <th>Upcoming Events</th>}
			</tr>
		</thead>
		<tbody>
            {times.map(t => <TradingTimesRow key={t.symbol} asset={t} compact={compact}/>)}
		</tbody>
	</table>
);

TradingTimesTable.propTypes = {
	submarket: PropTypes.string.isRequired,
	times: PropTypes.array.isRequired,
};

export default TradingTimesTable;
