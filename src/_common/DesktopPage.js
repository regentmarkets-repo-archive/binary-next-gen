import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DesktopHeader } from '../navigation';
import LoadingView from '../_common/LoadingView';

@connect(state => ({ isAuthorized: state.appInfo.get('authorized') }))
export default class DesktopPage extends React.Component {
	static propTypes = {
		children: PropTypes.any,
		isAuthorized: PropTypes.bool,
	};

	render() {
		const { children, isAuthorized } = this.props;
		return (
			isAuthorized ?
				<div className="desktop-page">
					<DesktopHeader />
					<div className="desktop-content">
						{children}
					</div>
				</div> :
				<LoadingView />
		);
	}
}
