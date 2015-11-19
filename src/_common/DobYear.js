import React from 'react';

export default () => {
	const years = Array.apply(0, Array(80));
	const lastValidYear = new Date().getFullYear() - 18;

	return (
		<select id="dobyy" name="dobyy">
			<option disabled>Year</option>
			{years.map((o, i) =>
				<option key={i} value={lastValidYear - i}>{lastValidYear - i}</option>
			)}
		</select>
	);
};
