import React, { PropTypes, Component } from 'react';

export default class DropDown extends Component {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	render() {
		const { shown, onClose, children } = this.props;

		if (!shown) return null;

		return (
			<div className="full-screen-overlay" onClick={onClose}>
				<div
					className="drop-down"
					onClick={e => e.stopPropagation()}
				>
					{React.cloneElement(children, { onClose })}
				</div>
			</div>
		);
	}
}
