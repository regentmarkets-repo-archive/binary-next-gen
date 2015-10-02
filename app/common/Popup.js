import React from 'react';

const Popup = (props) => props.shown ? (
	<div className="popup">
		<button className="close-btn" onClick={props.onClose}>X</button>
		{props.children}
	</div>
) : <div />;

Popup.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Popup;
