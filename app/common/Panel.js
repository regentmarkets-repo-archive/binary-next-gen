import React from 'react';
import { DragSource as dragSource } from 'react-dnd';

const cardSource = {
  	beginDrag(props) {
    	return {
			text: props.text,
    	};
	},
};

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});

const Panel = ({title, onClose, position = { left: 100, top: 100, width: 500, height: 350 }, children}) => (
	<div className="panel" style={{ left: position.left, top: position.top, width: position.width, height: position.height }}>
		<div className="panel-title">
			<label>{title}</label>
			<div>
				<button className="panel-btn" onClick={onClose}>&mdash;</button>
				<button className="panel-btn" onClick={onClose}>✖</button>
			</div>
		</div>
		{children}
	</div>
);

Panel.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default dragSource('card', cardSource, collect)(Panel);
