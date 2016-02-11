import React, { PropTypes } from 'react';
import Tabs from '../_common/Tabs';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import WatchlistContainer from '../watchlist/WatchlistContainer';

export default class WorkspaceLeftPanel extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		return (
			<Tabs
				activeIndex={workspace.leftActiveTab}
				className="left-panel"
				id="left-panel"
				onChange={idx => actions.changeActiveTab('left', idx)}
				style={{ width: workspace.leftPanelSize }}
				tabs={[
					{ text: 'Assets', component: <AssetPickerContainer actions={actions} /> },
					{ text: 'Watchlist', component: <WatchlistContainer actions={actions} /> },
					{ text: 'Details', component: <AssetDetailsContainer actions={actions} /> },
				]}
			/>
		);
	}
}
