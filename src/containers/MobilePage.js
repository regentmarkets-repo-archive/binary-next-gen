import React, { PropTypes, PureComponent } from 'react';
import MobileToolbarFull from '../mobile/MobileToolbarFull';
import MobileToolbarBack from '../mobile/MobileToolbarBack';
import IosPadder from './IosPadder';

export default class MobilePage extends PureComponent {

	static propTypes = {
		backBtnBarTitle: PropTypes.string,
		children: PropTypes.any,
		toolbarShown: PropTypes.bool,
		inverse: PropTypes.bool,
		backTo: PropTypes.any,
	};

	static defaultProps = {
		toolbarShown: true,
	};

	render() {
		const { backBtnBarTitle, children, toolbarShown, inverse, backTo } = this.props;

		return (
			<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
				{toolbarShown ? <MobileToolbarFull /> : null}
				{backBtnBarTitle ? <MobileToolbarBack backBtnBarTitle={backBtnBarTitle} to={backTo} /> : null}
				<div className="mobile-content">
					{children}
				</div>
				<IosPadder />
			</div>
		);
	}
}
