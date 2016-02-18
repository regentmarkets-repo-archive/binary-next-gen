import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import WorkspaceCard from './WorkspaceCard';
import workspaceSelectors from './workspaceSelectors';

@connect(workspaceSelectors)
export default class WorkspaceContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<WorkspaceCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
