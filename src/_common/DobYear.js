import React from 'react';
import M from '../_common/M';

export default ({ year, onYearChange }) => {
	const years = Array.apply(0, Array(80));
	const lastValidYear = new Date().getFullYear() - 18;

	return (
		<select id="dobyy" name="dobyy" defaultValue={year} onChange={onYearChange}>
			<option disabled>
				<M m="Year" />
			</option>
			{years.map((o, i) =>
				<option key={i} value={lastValidYear - i}>{lastValidYear - i}</option>
			)}
		</select>
	);
};
