import React from 'react';
import { LOCALIZED_MONTHS } from '../_utils/DateUtils';

export default () => (
	<select id="dobmm" name="dobmm">
		<option disabled>Month</option>
		{LOCALIZED_MONTHS.map((o, i) =>
			<option key={i} value={i}>{o}</option>
		)}
	</select>
);
