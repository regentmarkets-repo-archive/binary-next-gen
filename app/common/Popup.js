import React from 'react';

const Popup = ({shown, onClose, children}) => shown ? (
	<div className="popup">
		<button className="close-btn" onClick={onClose}>✖</button>
		{children}
	</div>
) : <div />;

Popup.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Popup;
