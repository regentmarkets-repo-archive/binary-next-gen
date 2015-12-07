import React from 'react';
import TradingTimesRow from './TradingTimesRow';

const TradingTimesTable = ({ submarket, times }) => (
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
                <th>Upcoming Events</th>
			</tr>
		</thead>
		<tbody>
            {times.map(t => <TradingTimesRow key={t.symbol} asset={t} />)}
		</tbody>
	</table>
);

TradingTimesTable.propTypes = {
	submarket: React.PropTypes.string.isRequired,
	times: React.PropTypes.array.isRequired,
};

export default TradingTimesTable;
