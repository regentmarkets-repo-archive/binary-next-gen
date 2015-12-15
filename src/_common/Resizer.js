import React, { PropTypes } from 'react';

export default class Resizer extends React.Component {

	static propTypes = {
		onResize: PropTypes.func.isRequired,
	};

	onMouseDown() {
		this.addGlobalEventHandlers();
	}

	addGlobalEventHandlers() {
		document.addEventListener('mousemove', ::this.onGlobalMouseMove);
		document.addEventListener('mouseup', ::this.onGlobalMouseUp);
	}

	onGlobalMouseMove(e) {
		this.props.onResize(e);
	}

	onGlobalMouseUp(e) {
		this.props.onResize(e);
		document.removeEventListener('mousemove', ::this.onGlobalMouseMove);
		document.removeEventListener('mouseup', ::this.onGlobalMouseUp);
	}

	render() {
		return (
			<div
				className="resizer-vertical"
				onMouseDown={::this.onMouseDown}
			/>
		);
	}
}
