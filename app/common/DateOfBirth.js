import React from 'react';
import { LOCALIZED_MONTHS } from '../common/DateUtils';

export default class DateOfBirth {

	renderDobDay() {
		const days = Array.apply(0, Array(31));

		return (
			<select id="dobdd" name="dobdd">
				<option disabled>Day</option>
				{ days.map((o, i) =>
					<option key={i} value={i + 1}>{i + 1}</option>
				) }
			</select>
		);
	}

	renderDobMonth() {
		return (
			<select id="dobmm" name="dobmm">
				<option disabled>Month</option>
				{ LOCALIZED_MONTHS.map((o, i) =>
					<option key={i} value={i}>{o}</option>
				) }
			</select>
		);
	}

	renderDobYear() {
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
	}

	render() {
		return (
			<span className="dob">
				{this.renderDobDay()}
				{this.renderDobMonth()}
				{this.renderDobYear()}
			</span>
		);
	}
}
