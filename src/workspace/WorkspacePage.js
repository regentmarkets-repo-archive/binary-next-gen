import React from 'react';
import { DesktopHeader, DesktopSidebar } from '../_common';
import WorkspaceContainer from './WorkspaceContainer';

export default (props) => (
	<div id="workspace">
		<DesktopHeader />
		<DesktopSidebar />
		<div className="desktop-content">
			{children}
		</div>
		<WorkspaceContainer {...props} />
	</div>
);
