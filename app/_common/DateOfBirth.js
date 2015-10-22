import React from 'react';
import { LOCALIZED_MONTHS } from '../_utils/DateUtils';


const DobDay = () => {
	const days = Array.apply(0, Array(31));

	return (
		<select id="dobdd" name="dobdd">
			<option disabled>Day</option>
			{ days.map((o, i) =>
				<option key={i} value={i + 1}>{i + 1}</option>
			) }
		</select>
	);
};

const DobMonth = () => (
	<select id="dobmm" name="dobmm">
		<option disabled>Month</option>
		{ LOCALIZED_MONTHS.map((o, i) =>
			<option key={i} value={i}>{o}</option>
		) }
	</select>
);

const DobYear = () => {
	const years = Array.apply(0, Array(80));
	const lastValidYear = new Date().getFullYear() - 18;

	return (
		<select id="dobyy" name="dobyy">
			<option disabled>Year</option>
			{ years.map((o, i) =>
				<option key={i} value={lastValidYear - i}>{lastValidYear - i}</option>
			) }
		</select>
	);
};

const DateOfBirth = () => (
	<span className="dob">
		<DobDay />
		<DobMonth />
		<DobYear />
	</span>
);

export default DateOfBirth;
