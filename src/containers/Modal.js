import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import CloseButton from 'binary-components/lib/CloseButton';

export default class Modal extends Component {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	componentDidMount() {
		document.addEventListener('keydown', this.closeOnEscape, false);
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	componentWillUnmount() {
		document.removeEventListener('keydown', this.closeOnEscape, false);
	}

	closeOnEscape = (evt) => {
		const { onClose } = this.props;
		if (evt.keyCode === 27 && onClose) {
			onClose();
		}
	}

	render() {
		const { shown, onClose, children } = this.props;

		if (!shown) return null;

		return (
			<div className="full-screen-overlay">
				<div className="modal">
					{onClose && <CloseButton onClick={onClose} />}
					{children}
				</div>
			</div>
		);
	}
}
