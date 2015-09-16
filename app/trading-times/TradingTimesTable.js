import React from 'react';
import TradingTimesRow from './TradingTimesRow';

const TradingTimesTable = (props) => (
	<table>
		<thead>
            <tr>
                <th colSpan="100">
                    {props.submarket.name}
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
            {props.submarket.symbols.map((s, i) => <TradingTimesRow key={i} symbol={s} />)}
		</tbody>
	</table>
);

TradingTimesTable.propTypes = {
	submarket: React.PropTypes.object.isRequired,
};

export default TradingTimesTable;
