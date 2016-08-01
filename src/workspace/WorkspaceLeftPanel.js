import React, { PropTypes, PureComponent } from 'react';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

const components = [
	AssetPickerContainer,
	WatchlistContainer,
];

export default class WorkspaceLeftPanel extends PureComponent {

	static propTypes = {
		workspace: PropTypes.object.isRequired,
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
