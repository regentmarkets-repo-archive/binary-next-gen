import React, { PropTypes } from 'react';
import M from '../_common/M';
import TradingTimesRow from './TradingTimesRow';

const TradingTimesTable = ({ times, compact }) => (
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
            {times.map(t => <TradingTimesRow key={t.symbol} asset={t} compact={compact}/>)}
		</tbody>
	</table>
);

TradingTimesTable.propTypes = {
	times: PropTypes.array.isRequired,
};

export default TradingTimesTable;
