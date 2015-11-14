import React from 'react';
import { bindActionCreators } from 'redux';
import * as WorkspaceActions from '../_actions/WorkspaceActions';
import { connect } from 'react-redux';
import WorkspaceCard from './WorkspaceCard';

@connect(state => ({ workspace: state.workspace }))
export default class WorkspaceContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		workspace: React.PropTypes.object,
	};

	render() {
		return (
			<WorkspaceCard
				actions={bindActionCreators(WorkspaceActions, this.props.dispatch)}
				{...this.props} />
		);
	}
}
