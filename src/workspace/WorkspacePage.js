import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DesktopHeader, LoadingView } from '../_common';
import WorkspaceContainer from './WorkspaceContainer';

@connect(state => ({ isAuthorized: state.appState.get('authorized') }))
export default class WorkspacePage extends React.Component {
	static propTypes = {
		children: PropTypes.any,
		isAuthorized: PropTypes.bool.isRequired,
	};

	render() {
		return (
			this.props.isAuthorized ?
				<div id="workspace">
					<DesktopHeader />
					<WorkspaceContainer {...this.props} />
				</div> :
				<LoadingView />
		);
	}
}
