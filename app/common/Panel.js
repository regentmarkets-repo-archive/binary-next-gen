import React from 'react';
import Draggable from 'react-draggable';

const Panel = ({title, onClose, position = { left: 100, top: 100, width: 500, height: 350 }, children}) => (
	<Draggable handle=".panel-title" bounds={{left: -position.left, top: -position.top + 50, right: 1000, bottom: 1000}}>
		<div className="panel" style={{ left: position.left, top: position.top, width: position.width, height: position.height }}>
			<div className="panel-title">
				<label>{title}</label>
				<div>
					<button className="panel-btn" onClick={onClose}>&mdash;</button>
					<button className="panel-btn" onClick={onClose}>✖</button>
				</div>
			</div>
			<div className="panel-content">
				{children}
			</div>
		</div>
	</Draggable>
);

Panel.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Panel;
