import React from 'react';
import ReactAddons from 'react/addons';


export default class Modal {

	static propTypes = {
        shown: React.PropTypes.bool,
		onClose: React.PropTypes.func
    };

	renderModal() {

		const { onClose } = this.props;

		return (
			<div className="full-screen-overlay" onClick={onClose}>
				<div className="modal">
					<button onClick={onClose}>X</button>
					{this.props.children}
				</div>
			</div>
		);
	}

	render() {

		const { shown, onClose } = this.props;
		const ReactCSSTransitionGroup = ReactAddons.addons.CSSTransitionGroup;

		return (
			<ReactCSSTransitionGroup transitionName="show">
				{shown ? this.renderModal() : <div/>}
			</ReactCSSTransitionGroup>
		);
	}
}
