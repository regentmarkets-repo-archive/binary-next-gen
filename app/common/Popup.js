import React from 'react';

const Popup = ({shown, title, onClose, children}) => shown ? (
	<div className="popup">
		<div className="popup-title">
			<label>{title}</label>
			<div>
				<button className="popup-btn" onClick={onClose}>&mdash;</button>
				<button className="popup-btn" onClick={onClose}>✖</button>
			</div>
		</div>
		{children}
	</div>
) : <div />;

Popup.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Popup;
