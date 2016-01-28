import React from 'react';
import M from '../_common/M';

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export default ({ month, onMonthChange }) => (
	<select id="dobmm" name="dobmm" defaultValue={month} onChange={onMonthChange}>
		<option disabled>
			<M m="Month" />
		</option>
		{MONTHS.map((o, i) =>
			<option key={i} value={i}>
				<M m={o} />
			</option>
		)}
	</select>
);
