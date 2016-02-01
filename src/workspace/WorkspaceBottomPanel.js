import React from 'react';
import { Tabs } from '../_common';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';

export default ({ actions, workspace }) => (
	<Tabs
		activeIndex={workspace.bottomActiveTab}
		className="bottom-panel"
		id="bottom-panel"
		onChange={idx => actions.changeActiveTab('bottom', idx)}
		style={{ height: workspace.bottomPanelSize }}
		tabs={[
			{ text: 'Open Positions', component: <PortfolioContainer actions={actions} /> },
			{ text: 'Transactions', component: <StatementContainer actions={actions} /> },
		]}
	/>
);
