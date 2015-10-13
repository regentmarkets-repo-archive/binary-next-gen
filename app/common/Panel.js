import React from 'react';

const Panel = ({shown = true, title, onClose, position = { left: 100, top: 100, width: 500, height: 350 }, children}) => shown ? (
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
) : <div />;

Panel.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Panel;
