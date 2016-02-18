import React, { PropTypes, Component } from 'react';

export default class Modal extends Component {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	render() {
		const { shown, onClose, children } = this.props;

		return shown ? (
			<div className="full-screen-overlay" onClick={onClose}>
				<div className="modal">
					<button className="close-btn" onClick={onClose}><img src="img/close.svg" /></button>
					{children}
				</div>
			</div>
		) : <div />;
	}
}
