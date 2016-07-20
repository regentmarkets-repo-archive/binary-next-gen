import React, { PropTypes, PureComponent } from 'react';
import MobileToolbarBack from '../mobile/MobileToolbarBack';

export default class MobilePageDropDown extends PureComponent {

	static propTypes = {
		shown: PropTypes.bool,
		title: PropTypes.string,
		onClose: PropTypes.func,
		children: PropTypes.any,
	};

	render() {
		const { shown, onClose, title, children } = this.props;
		const inverse = false;

		if (!shown) return null;

		return (
			<div className={inverse ? 'mobile-page mobile-drop-down inverse' : 'mobile-page mobile-drop-down'}>
				<MobileToolbarBack backBtnBarTitle={title} onClick={onClose} />
				<div className="mobile-content">
					{React.cloneElement(children, { onClose })}
				</div>
			</div>
		);
	}
}
