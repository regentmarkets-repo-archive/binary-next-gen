import React, { PropTypes } from 'react';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

const components = [
	AssetPickerContainer,
	WatchlistContainer,
	AssetDetailsContainer,
];

export default class WorkspaceLeftPanel extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		const ActiveComponent = components[workspace.leftActiveTab];

		return (
			<div
				className="workspace-panel"
				style={{ width: workspace.leftPanelSize }}
			>
				<ActiveComponent actions={actions} />
			</div>
		);
	}
}
