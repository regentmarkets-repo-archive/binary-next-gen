import React, { PropTypes } from 'react';

const ErrorMsg = ({ shown, text }) => (
	shown ? <p className="errorfield">{text}</p> : <span />
);

ErrorMsg.propTypes = {
	shown: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export default ErrorMsg;
