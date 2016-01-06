import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingView from '../_common/LoadingView';
import WorkspaceCard from './WorkspaceCard';

@connect(state => ({ workspace: state.workspace, isAuthorized: state.appInfo.get('authorized') }))
export default class WorkspaceContainer extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		workspace: PropTypes.object,
		isAuthorized: PropTypes.bool,
	};

	render() {
		return (
			this.props.isAuthorized ?
				<WorkspaceCard {...this.props} /> :
				<LoadingView />
		);
	}
}
