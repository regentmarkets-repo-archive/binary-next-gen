import React from 'react';
import DobDay from './DobDay';
import DobMonth from './DobMonth';
import DobYear from './DobYear';

export default () => (
	<span className="dob">
		<DobDay />
		<DobMonth />
		<DobYear />
	</span>
);
