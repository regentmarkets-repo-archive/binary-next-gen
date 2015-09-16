import React from 'react';

const LogoSpinner = (props) => {
	const classNames = ['form-logo', props.spinning ? 'spinner' : null];

	return (
		<img className={classNames.join(' ')} src="https://static.binary.com/images/pages/binary-symbol-logo.svg"/>
	);
};

LogoSpinner.propTypes = {
	spinning: React.PropTypes.bool,
};

export default LogoSpinner;
