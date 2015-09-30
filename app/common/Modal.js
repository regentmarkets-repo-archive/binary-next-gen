import React from 'react';

const Modal = (props) => props.shown ? (
	<div className="full-screen-overlay" onClick={props.onClose}>
		<div className="modal">
			<button className="close-btn" onClick={props.onClose}>X</button>
			{props.children}
		</div>
	</div>
) : <div />;

Modal.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Modal;
