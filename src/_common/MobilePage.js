import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MobileToolbarFull, MobileToolbarBack } from '../navigation';
import LoadingView from '../_common/LoadingView';

@connect(state => ({ isAuthorized: state.appInfo.get('authorized') }))
export default class MobilePage extends React.Component {
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
		const { backBtnBarTitle, children, toolbarShown, inverse, backTo, isAuthorized } = this.props;
		return (
			isAuthorized ?
				<div className={inverse ? 'mobile-page inverse' : 'mobile-page'}>
					{toolbarShown ? <MobileToolbarFull /> : null}
					{backBtnBarTitle ? <MobileToolbarBack backBtnBarTitle={backBtnBarTitle} to={backTo} /> : null}
					<div className="mobile-content">
						{children}
					</div>
				</div> :
				<LoadingView />
		);
	}
}
