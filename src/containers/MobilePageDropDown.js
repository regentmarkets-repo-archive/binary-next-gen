import React, { PureComponent } from 'react';
import AnimatedPopup from './AnimatedPopup';
import MobileToolbarBack from '../mobile/MobileToolbarBack';

export default class MobilePageDropDown extends PureComponent {

	props: {
		shown: boolean,
		title: string,
		onClose: (e: SyntheticEvent) => void,
		children: any,
	};

	render() {
		const { shown, onClose, title, children } = this.props;
		const inverse = false;
		const className = inverse ? 'mobile-page mobile-drop-down inverse' : 'mobile-page mobile-drop-down';

		return (
			<AnimatedPopup shown={shown}>
				<div className={className}>
					<MobileToolbarBack backBtnBarTitle={title} onClick={onClose} />
					<div className="mobile-content">
						{React.cloneElement(children, { onClose })}
					</div>
				</div>
			</AnimatedPopup>
		);
	}
}
