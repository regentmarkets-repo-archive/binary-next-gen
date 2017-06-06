import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LogoSpinner } from 'binary-components';

@connect(state => ({ isAuthorized: state.appState.get('authorized') }))
export default class WebPage extends PureComponent {

	props: {
		children: any,
		isAuthorized: boolean,
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
