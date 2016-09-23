import React, { PureComponent } from 'react';
import AnimatedPopup from './AnimatedPopup';

export default class PopupDropDown extends PureComponent {

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

	onClickWithin = (e: SyntheticEvent) => e.stopPropagation();

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
				<div className="drop-down-wrapper">
					<div
						className="drop-down"
						onClick={this.onClickWithin}
					>
						{React.cloneElement(children, { onClose })}
					</div>
					<div className="full-screen-overlay" onClick={onClose} />}
				</div>
			</AnimatedPopup>
		);
	}
}
