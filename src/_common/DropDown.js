import React, { PropTypes, Component } from 'react';

const DropDown = ({ shown, onClose, component }) => shown ? (
	<div className="full-screen-overlay" onClick={onClose}>
		<div className="drop-down">
			{component}
		</div>
	</div>
) : <div />;

DropDown.propTypes = {
	shown: PropTypes.bool,
	onClose: PropTypes.func,
	component: PropTypes.any,
};

export default DropDown;
