import React from 'react';
import { Tabs } from '../_common';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';

export default ({ actions, workspace }) => (
	<div id="bottom-panel" style={{ height: workspace.get('bottomPanelSize') }}>
		<Tabs
			id="bottom-panel"
			activeIndex={workspace.get('bottomActiveTab')}
			onChange={idx => actions.changeActiveTab('bottom', idx)}
			tabs={[
				{ text: 'Open Positions', component: <PortfolioContainer actions={actions} /> },
				{ text: 'Transactions', component: <StatementContainer actions={actions} /> },
			]}
		/>
	</div>
);
