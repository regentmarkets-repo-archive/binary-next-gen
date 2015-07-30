import React from 'react';

export default class Modal {

	static propTypes = {
        shown: React.PropTypes.bool,
		onClose: React.PropTypes.func
    };

	render() {

		const { shown, onClose } = this.props;

		if (!shown) return <div />;

		return (
			<div className="full-screen-overlay" onClick={onClose}>
				<div className="modal-dialog">
					<button onClick={onClose}>X</button>
					{this.props.children}
				</div>
			</div>
		);
	}
}
