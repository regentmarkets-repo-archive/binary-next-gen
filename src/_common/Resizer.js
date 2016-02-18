import React, { PropTypes, Component } from 'react';

export default class Resizer extends Component {

	static propTypes = {
		onResize: PropTypes.func.isRequired,
		className: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = { mousemove: ::this.onGlobalMouseMove, mouseup: ::this.onGlobalMouseUp };
	}

	onMouseDown() {
		this.addGlobalEventHandlers();
	}

	addGlobalEventHandlers() {
		window.addEventListener('mousemove', this.state.mousemove);
		window.addEventListener('mouseup', this.state.mouseup);
	}

	onGlobalMouseMove(e) {
		this.props.onResize(e);
	}

	onGlobalMouseUp(e) {
		this.props.onResize(e);
		window.removeEventListener('mousemove', this.state.mousemove);
		window.removeEventListener('mouseup', this.state.mouseup);
	}

	render() {
		return (
			<div
				className={this.props.className}
				onMouseDown={::this.onMouseDown}
			/>
		);
	}
}
