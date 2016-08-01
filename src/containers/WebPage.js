import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { LogoSpinner } from 'binary-components';

@connect(state => ({ isAuthorized: state.appState.get('authorized') }))
export default class WebPage extends PureComponent {

	static propTypes = {
		children: PropTypes.any,
		isAuthorized: PropTypes.bool,
	};

	render() {
		const { children, isAuthorized } = this.props;
		return (
			isAuthorized ?
				<div className="web-page">
					<div className="web-content">
						{children}
					</div>
				</div> :
				<div className="mobile-page">
					<LogoSpinner />
				</div>
		);
	}
}
