import React from 'react';
import NumberPlain from './NumberPlain';

const NumberColored = (props) => (
	<NumberPlain className={(props.value < 0 && 'number-negative') || (props.value > 0 && 'number-positive')} {...props} />
);

NumberColored.propTypes = {
	value: React.PropTypes.any,
};

export default NumberColored;
