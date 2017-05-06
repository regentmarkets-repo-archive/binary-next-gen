import React, { PureComponent } from 'react';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

const components = [
	AssetPickerContainer,
	WatchlistContainer,
];

export default class WorkspaceLeftPanel extends PureComponent {

	props: {
		workspace: object,
	};

	render() {
		const { workspace } = this.props;

		const ActiveComponent = components[workspace.leftActiveTab];

		return (
			<div
				className="workspace-panel"
				style={{ width: workspace.leftPanelSize }}
			>
				<ActiveComponent />
			</div>
		);
	}
}
