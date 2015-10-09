import React from 'react';

const NumberPlain = (props) => {
	if (isNaN(props.value)) {
		return <span />;
	}

	const value = +props.value;
	let formattedValue = value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	if (value < 0) {
		formattedValue = '(' + formattedValue.substring(1) + ')';
	}

	return (
		<span {...props}>{props.currency} {formattedValue}</span>
	);
};

NumberPlain.propTypes = {
	currency: React.PropTypes.string,
	value: React.PropTypes.any,
};

export default NumberPlain;
