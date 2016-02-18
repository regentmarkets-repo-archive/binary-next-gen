import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoadingView from '../_common/LoadingView';

@connect(state => ({ isAuthorized: state.appState.get('authorized') }))
export default class WebPage extends Component {

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
				<LoadingView />
		);
	}
}
