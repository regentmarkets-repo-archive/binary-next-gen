import React, { PropTypes, Component } from 'react';
import CloseButton from '../_common/CloseButton';

export default class Modal extends Component {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	render() {
		const { shown, onClose, children } = this.props;

		if (!shown) return null;

		return (
			<div className="full-screen-overlay">
				<div className="modal">
					<CloseButton onClick={onClose} />
					{children}
				</div>
			</div>
		);
	}
}
