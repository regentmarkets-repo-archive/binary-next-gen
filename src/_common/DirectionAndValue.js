import React, { PropTypes } from 'react';
import Direction from './Direction';
import { directionClassName } from '../_utils/StyleUtils';

const DirectionAndValue = ({ diff, value }) => (
	<span>
		<Direction diff={diff} />
		<span className={directionClassName(diff)}>{value}</span>
	</span>
);

DirectionAndValue.propTypes = {
	diff: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default DirectionAndValue;
