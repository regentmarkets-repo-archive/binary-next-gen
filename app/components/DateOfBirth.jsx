import React from "react";
import { Link } from "react-router";

class DobDay extends React.Component {

	render() {

		let days = Array.apply(0, Array(31));

		return (
			<select id='dobdd' name='dobdd'>
				<option>Day</option>
				{days.map((o, i) => <option value='{i + 1}'>{i + 1}</option>)}
			</select>
		);
	}
}

class DobMonth extends React.Component {
	render() {
		return (
			<select id='dobmm' name='dobmm'>
				<option value=''>Month</option>
				<option value='01'>Jan</option>
				<option value='02'>Feb</option>
				<option value='03'>Mar</option>
				<option value='04'>Apr</option>
				<option value='05'>May</option>
				<option value='06'>Jun</option>
				<option value='07'>Jul</option>
				<option value='08'>Aug</option>
				<option value='09'>Sep</option>
				<option value='10'>Oct</option>
				<option value='11'>Nov</option>
				<option value='12'>Dec</option>
			</select>
		);
	}
}

class DobYear extends React.Component {

	render() {

		let years = Array.apply(0, Array(80));
		let lastValidYear = new Date().getFullYear() - 18;

		return (
			<select id='dobyy' name='dobyy'>
				<option value=''>Year</option>
				{years.map((o, i) => <option value='{lastValidYear + i - 80}'>{lastValidYear + i - 80}</option>)}
			</select>
		);
	}
}

export default class DateOfBirth extends React.Component {
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
