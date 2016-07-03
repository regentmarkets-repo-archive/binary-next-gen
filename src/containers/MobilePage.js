import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import MobileToolbarFull from '../mobile/MobileToolbarFull';
import MobileToolbarBack from '../mobile/MobileToolbarBack';

export default class MobilePage extends Component {

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

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		const { backBtnBarTitle, children, toolbarShown, inverse, backTo } = this.props;

		return (
			<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
				{toolbarShown ? <MobileToolbarFull /> : null}
				{backBtnBarTitle ? <MobileToolbarBack backBtnBarTitle={backBtnBarTitle} to={backTo} /> : null}
				<div className="mobile-content">
					{children}
				</div>
			</div>
		);
	}
}
