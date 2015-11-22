import React from 'react';

const LOCALIZED_MONTHS = [];

export default () => (
	<select id="dobmm" name="dobmm">
		<option disabled>Month</option>
		{LOCALIZED_MONTHS.map((o, i) =>
			<option key={i} value={i}>{o}</option>
		)}
	</select>
);
