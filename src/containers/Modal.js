import React, { PropTypes, PureComponent } from 'react';
import CloseButton from 'binary-components/lib/CloseButton';
import AnimatedPopup from './AnimatedPopup';

export default class Modal extends PureComponent {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	componentDidMount() {
		document.addEventListener('keydown', this.closeOnEscape, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.closeOnEscape, false);
	}

	closeOnEscape = e => {
		const { onClose } = this.props;
		if (e.keyCode === 27 && onClose) {
			onClose();
		}
	}

	render() {
		const { shown, onClose, children } = this.props;

		return (
			<AnimatedPopup shown={shown}>
				<div className="full-screen-overlay">
					<div className="modal">
						{onClose && <CloseButton onClick={onClose} />}
						{children}
					</div>
				</div>
			</AnimatedPopup>
		);
	}
}
