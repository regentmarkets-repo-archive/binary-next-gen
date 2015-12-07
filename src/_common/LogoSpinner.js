import React from 'react';

const LogoSpinner = ({ spinning }) => {
	const classNames = [spinning ? 'spinner' : null];

	return (
		<img className={classNames.join(' ')} src="img/binary-symbol-logo.svg"/>
	);
};

LogoSpinner.propTypes = {
	spinning: React.PropTypes.bool,
};

export default LogoSpinner;
