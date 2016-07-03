import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class DropDown extends Component {

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

	onClickWithin = e => e.stopPropagation();

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
