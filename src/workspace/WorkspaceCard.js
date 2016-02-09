import React, { PropTypes } from 'react';
import { Resizer } from '../_common';
import TradesContainer from '../trades/TradesContainer';
import WorkspaceLeftPanel from './WorkspaceLeftPanel';
import WorkspaceRightPanel from './WorkspaceRightPanel';
import WorkspaceBottomPanel from './WorkspaceBottomPanel';

const updateSizeWithBoundary = (size, update, min, max) => {
	if (size < min) {
		update(10);
		return;
	}

	if (size > max) {
		return;
	}

	update(size);
};

export default class WorkspaceCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		return (
			<div id="panels">
				{workspace.leftPanelVisible &&
					<WorkspaceLeftPanel actions={actions} workspace={workspace} />}
				<Resizer
					className="resizer-vertical"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'leftPanelSize');
						const size = e.x - 4;
						updateSizeWithBoundary(size, update, 100, 750);
					}}
				/>
				<div id="mid-panel">
					<div id="workarea">
						<TradesContainer
							actions={actions}
							tradeMode={workspace.tradeMode}
						/>
					</div>
					<Resizer
						className="resizer-horizontal"
						onResize={e => {
							const update = actions.updateWorkspaceField.bind(null, 'bottomPanelSize');
							const size = window.innerHeight - e.y - 4;
							updateSizeWithBoundary(size, update, 100, 300);
						}}
					/>
				{workspace.bottomPanelVisible &&
					<WorkspaceBottomPanel actions={actions} workspace={workspace} />}
				</div>
				<Resizer
					className="resizer-vertical"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'rightPanelSize');
						const size = window.innerWidth - e.x - 4;
						updateSizeWithBoundary(size, update, 100, 700);
					}}
				/>
				{workspace.rightPanelVisible &&
					<WorkspaceRightPanel actions={actions} workspace={workspace} />}
			</div>
		);
	}
}
