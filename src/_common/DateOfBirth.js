import React from 'react';
import DobDay from './DobDay';
import DobMonth from './DobMonth';
import DobYear from './DobYear';

export default ({ date, onDayChange, onMonthChange, onYearChange }) => (
	<span className="dob">
		<DobDay day={date.getDate()} onDayChange={onDayChange} />
		<DobMonth month={date.getMonth()} onMonthChange={onMonthChange} />
		<DobYear year={date.getFullYear()} onYearChange={onYearChange} />
	</span>
);
