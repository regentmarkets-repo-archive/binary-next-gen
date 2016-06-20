import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoadingView from 'binary-components/lib/LoadingView';
import RealityCheckContainer from '../reality-check/RealityCheckContainer';

@connect(state => ({ isAuthorized: state.appState.get('authorized') }))
export default class WebPage extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		children: PropTypes.any,
		isAuthorized: PropTypes.bool,
	};

	render() {
		const { actions, children, isAuthorized } = this.props;
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
