import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import WorkspaceCard from './WorkspaceCard';
import workspaceSelectors from './workspaceSelectors';

@connect(workspaceSelectors)
export default class WorkspaceContainer extends PureComponent {

	render() {
		return (
			<WorkspaceCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
