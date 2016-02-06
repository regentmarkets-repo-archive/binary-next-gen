import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import WorkspaceCard from './WorkspaceCard';
import workspaceSelectors from '../_selectors/WorkspaceSelectors';

@connect(workspaceSelectors)
export default class WorkspaceContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<WorkspaceCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
