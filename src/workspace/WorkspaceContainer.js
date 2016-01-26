import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WorkspaceCard from './WorkspaceCard';

@connect(state => ({ workspace: state.workspace, isAuthorized: state.appState.get('authorized') }))
export default class WorkspaceContainer extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		workspace: PropTypes.object,
		isAuthorized: PropTypes.bool,
	};

	render() {
		return (
			<WorkspaceCard {...this.props} />
		);
	}
}
