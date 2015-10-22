import React from 'react';
import Direction from './Direction';
import { directionClassName } from './ClassNameUtils';

const DirectionAndValue = ({diff, value}) => (
	<span>
		<Direction diff={diff} />
		<span className={directionClassName(diff)}>{value}</span>
	</span>
);

DirectionAndValue.propTypes = {
	diff: React.PropTypes.number.isRequired,
	value: React.PropTypes.number.isRequired,
};

export default DirectionAndValue;
