import React from 'react';

const Modal = ({ shown, onClose, children }) => shown ? (
	<div className="full-screen-overlay" onClick={onClose}>
		<div className="modal">
			<button className="close-btn" onClick={onClose}>✖</button>
			{children}
		</div>
	</div>
) : <div />;

Modal.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Modal;
