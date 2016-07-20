import React, { PropTypes, PureComponent } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PopupDropDown extends PureComponent {

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

		return (
			<ReactCSSTransitionGroup transitionName="popup" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
				{!shown ? null : <div
					className="drop-down"
					onClick={this.onClickWithin}
				>
					{React.cloneElement(children, { onClose })}
				</div>}
				{!shown ? null : <div className="full-screen-overlay" onClick={onClose} />}
			</ReactCSSTransitionGroup>
		);
	}
}
