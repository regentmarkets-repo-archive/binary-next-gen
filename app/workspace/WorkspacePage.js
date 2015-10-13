import React from 'react';
import { DesktopPage } from '../common';
import WorkspaceContainer from './WorkspaceContainer';

export default (props) => (
	<DesktopPage>
		<WorkspaceContainer {...props} />
	</DesktopPage>
);
