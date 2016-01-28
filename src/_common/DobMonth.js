import React from 'react';

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
		<option disabled>Month</option>
		{MONTHS.map((o, i) =>
			<option key={i} value={i}>{o}</option>
		)}
	</select>
);
