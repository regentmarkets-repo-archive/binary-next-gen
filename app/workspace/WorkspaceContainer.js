import React from 'react';
import { connect } from 'react-redux';
import WorkspacePane from './WorkspacePane';

@connect(state => ({ workspace: state.workspace }))
export default class WorkspaceContainer extends React.Component {

	static propTypes = {
		workspace: React.PropTypes.object,
	};

	render() {
		return (
			<WorkspacePane {...this.props} />
		);
	}
}
