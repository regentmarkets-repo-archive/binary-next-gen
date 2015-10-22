import React from 'react';

const ErrorMsg = ({shown, text}) => (
	shown ? <p className="errorfield">{text}</p> : <span />
);

ErrorMsg.propTypes = {
	shown: React.PropTypes.bool.isRequired,
	text: React.PropTypes.string.isRequired,
};

export default ErrorMsg;
