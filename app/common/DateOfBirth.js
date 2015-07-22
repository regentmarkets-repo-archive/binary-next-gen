import React from 'react';
import moment from 'moment';

class DobDay {

	render() {

		let days = Array.apply(0, Array(31));

		return (
			<select id='dobdd' name='dobdd' value=''>
				<option disabled>Day</option>
				{ days.map((o, i) =>
					<option key={i} value={i + 1}>{i + 1}</option>
				) }
			</select>
		);
	}
}

class DobMonth {

	render() {

		const months = moment.localeData()._months;

		return (
			<select id='dobmm' name='dobmm' value=''>
				<option disabled>Month</option>
				{ months.map((o, i) =>
					<option key={i} value={i}>{o}</option>
				) }
			</select>
		);
	}
}

class DobYear {

	render() {

		let years = Array.apply(0, Array(80));
		let lastValidYear = new Date().getFullYear() - 18;

		return (
			<select id='dobyy' name='dobyy' value=''>
				<option disabled>Year</option>
				{ years.map((o, i) =>
					<option key={i} value={lastValidYear - i}>{lastValidYear - i}</option>
				) }
			</select>
		);
	}
}

export default class DateOfBirth {
	
	render() {
		return (
			<span className='dob'>
				<DobDay/>
				<DobMonth/>
				<DobYear/>
			</span>
		);
	}
}
