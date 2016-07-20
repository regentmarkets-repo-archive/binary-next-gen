import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import WorkspaceCard from './WorkspaceCard';
import workspaceSelectors from './workspaceSelectors';

@connect(workspaceSelectors)
export default class WorkspaceContainer extends Component {

	render() {
		return (
			<WorkspaceCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
