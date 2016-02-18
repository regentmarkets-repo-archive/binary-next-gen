import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MobileToolbarFull from '../mobile/MobileToolbarFull';
import MobileToolbarBack from '../mobile/MobileToolbarBack';

@connect(state => ({ isAuthorized: state.appState.get('authorized') }))
export default class MobilePage extends Component {

	static propTypes = {
		backBtnBarTitle: PropTypes.string,
		children: PropTypes.any,
		toolbarShown: PropTypes.bool,
		inverse: PropTypes.bool,
		backTo: PropTypes.any,
		isAuthorized: PropTypes.bool,
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
			</div>
		);
	}
}
