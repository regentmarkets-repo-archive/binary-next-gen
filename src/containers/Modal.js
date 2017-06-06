import React, { PureComponent } from 'react';
import Clear from 'react-material-design-icons/icons/Clear';
import AnimatedPopup from './AnimatedPopup';

export default class Modal extends PureComponent {

	props: {
		shown: boolean,
		onClose: (e: SyntheticEvent) => void,
		children: any,
	};

	componentDidMount() {
		document.addEventListener('keydown', this.closeOnEscape, false);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.closeOnEscape, false);
	}

	closeOnEscape = (e: SyntheticEvent) => {
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
						{onClose && <Clear className="close-btn" onClick={onClose} />}
						{children}
					</div>
				</div>
			</AnimatedPopup>
		);
	}
}
