import React from 'react';
import { DesktopHeader, DesktopSidebar } from '../_common';
import WorkspaceContainer from './WorkspaceContainer';

const WorkspacePage = (props) => (
	<div id="workspace">
		<DesktopHeader />
		<DesktopSidebar />
		<WorkspaceContainer {...props} />
	</div>
);

WorkspacePage.propTypes = {
	children: React.PropTypes.any,
};

export default WorkspacePage;
