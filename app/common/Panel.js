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
	currentOffset: monitor.getSourceClientOffset(),
});

class Panel extends React.Component {
	render() {
		const {title, onClose, position = { left: 100, top: 100, width: 500, height: 350 }, children} = this.props;
		const { connectDragSource, currentOffset } = this.props;

		return connectDragSource(
			<div className="panel" style={{ left: position.left, top: position.top, width: position.width, height: position.height }}>
				<div className="panel-title">
					<label>{title} {JSON.stringify(currentOffset)}</label>
					<div>
						<button className="panel-btn" onClick={onClose}>&mdash;</button>
						<button className="panel-btn" onClick={onClose}>✖</button>
					</div>
				</div>
				{children}
			</div>
		);
	}
}

Panel.propTypes = {
	title: React.PropTypes.string,
	position: React.PropTypes.object,
	onClose: React.PropTypes.func,
	isDragging: React.PropTypes.bool,
	children: React.PropTypes.any,
	connectDragSource: React.PropTypes.func,
	currentOffset: React.PropTypes.object,
};

export default dragSource('card', cardSource, collect)(Panel);
