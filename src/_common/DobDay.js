import React from 'react';

export default ({ day, onDayChange }) => {
	const days = Array.apply(0, Array(31));

	return (
		<select id="dobdd" name="dobdd" defaultValue={day} onChange={onDayChange}>
			<option disabled>Day</option>
			{days.map((o, i) =>
				<option key={i} value={i + 1}>{i + 1}</option>
			)}
		</select>
	);
};
