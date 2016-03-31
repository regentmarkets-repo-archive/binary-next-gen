import React, { PropTypes, Component } from 'react';
import Draggable from 'react-draggable';

export default class Panel extends Component {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
		title: PropTypes.string,
		position: PropTypes.object,
	};

	render() {
		const { title, onClose, position = { left: 100, top: 100, width: 500, height: 350 }, children } = this.props;

		return (
			<Draggable
				handle=".panel-title"
				bounds={{ left: -position.left, top: -position.top + 50, right: 1000, bottom: 1000 }}
			>
				<div className="panel" style={{ ...position }}>
					<div className="panel-title">
						<label>{title}</label>
						<div>
							<button className="panel-btn" onClick={onClose}>✖</button>
						</div>
					</div>
					<div className="panel-content">
						{children}
					</div>
				</div>
			</Draggable>
		);
	}
}
