import React, { PropTypes, Component } from 'react';
import { Direction, NumberPlain } from './';
import { directionClassName } from '../_utils/StyleUtils';

const DirectionAndValue = ({ diff, value }) => (
	<span>
		<Direction diff={diff} />
		<NumberPlain className={directionClassName(diff)} value={value} />
	</span>
);

DirectionAndValue.propTypes = {
	diff: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default DirectionAndValue;
