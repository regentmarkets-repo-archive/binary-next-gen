import React, { PropTypes, PureComponent } from 'react';

export default class DropDown extends PureComponent {

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

	onClickWithin = e => e.stopPropagation();

	closeOnEscape = e => {
		const { onClose } = this.props;
		if (e.keyCode === 27 && onClose) {
			onClose();
		}
	}

	render() {
		const { shown, onClose, children } = this.props;

		if (!shown) return null;

		return (
			<div>
				<div
					className="drop-down"
					onClick={this.onClickWithin}
				>
					{React.cloneElement(children, { onClose })}
				</div>
				<div className="full-screen-overlay" onClick={onClose} />
			</div>
		);
	}
}
