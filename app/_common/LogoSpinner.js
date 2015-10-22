import React from 'react';

const LogoSpinner = ({spinning}) => {
	const classNames = [spinning ? 'spinner' : null];

	return (
		<img className={classNames.join(' ')} src="https://static.binary.com/images/pages/binary-symbol-logo.svg"/>
	);
};

LogoSpinner.propTypes = {
	spinning: React.PropTypes.bool,
};

export default LogoSpinner;
