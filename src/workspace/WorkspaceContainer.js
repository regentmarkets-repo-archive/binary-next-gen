import React from 'react';
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
			<WorkspaceCard {...this.props} />
		);
	}
}
