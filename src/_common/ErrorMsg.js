import React, { PropTypes } from 'react';
import M from '../_common/M';

const ErrorMsg = ({ shown, text }) => (
	shown ? <p className="errorfield"><M m={text} /></p> : <span />
);

ErrorMsg.propTypes = {
	shown: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export default ErrorMsg;
