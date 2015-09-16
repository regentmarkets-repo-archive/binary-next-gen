import React from 'react';

const ErrorMsg = (props) => {
	if (!props.shown) return <span />;

	return (
		<p className="errorfield">
			{props.text}
		</p>
	);
};

ErrorMsg.propTypes = {
	shown: React.PropTypes.bool.isRequired,
	text: React.PropTypes.string.isRequired,
};

export default ErrorMsg;
