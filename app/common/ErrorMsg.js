import React from 'react';

const ErrorMsg = ({shown, text}) => (
	shown ? <span /> : <p className="errorfield">{text}</p>
);

ErrorMsg.propTypes = {
	shown: React.PropTypes.bool.isRequired,
	text: React.PropTypes.string.isRequired,
};

export default ErrorMsg;
