import React, { PropTypes, Component } from 'react';

export default class DropDown extends Component {

	static propTypes = {
		shown: PropTypes.bool,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	onClickWithin = e => e.stopPropagation();

	render() {
		const { shown, onClose, children } = this.props;

		if (!shown) return null;

		return (
			<div>
				<div
					className="drop-down"
					onClick={this.onClickWithin}
				>
					{React.cloneElement(children, { onClose })}
				</div>
				<div className="full-screen-overlay" onClick={onClose} />
			</div>
		);
	}
}
