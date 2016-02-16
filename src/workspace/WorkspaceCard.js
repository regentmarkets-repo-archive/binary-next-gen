import React, { PropTypes } from 'react';
import Resizer from '../_common/Resizer';
import TradesContainer from '../trades/TradesContainer';
import WorkspaceLeftPanel from './WorkspaceLeftPanel';
import WorkspaceRightPanel from './WorkspaceRightPanel';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';

const updateSizeWithBoundary = (size, update, min = 100, max = 750) => {
	if (size >= min && size <= max) {
		update(size);
	} else if (size < min) {
		update(0);
	}
};

export default class WorkspaceCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		const onChangeLeftPanel = idx =>
			actions.updateWorkspaceField('leftActiveTab', idx);

		const onChangeRightPanel = idx =>
			actions.updateWorkspaceField('rightActiveTab', idx);

		return (
			<div id="panels">
				<TabList
					id="left-tab-list"
					vertical
					showText={false}
					onChange={idx => onChangeLeftPanel(idx)}
				>
					<Tab imgSrc="img/trade.svg" text="Assets" />
					<Tab imgSrc="img/watchlist.svg" text="Watchlist" />
					<Tab imgSrc="img/info.svg" text="Details" />
				</TabList>
				{workspace.leftPanelVisible &&
					<WorkspaceLeftPanel actions={actions} workspace={workspace} />}
				<Resizer
					className="resizer-vertical"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'leftPanelSize');
						updateSizeWithBoundary(e.x - 45, update);
					}}
				/>
				<div id="workarea">
					<TradesContainer
						actions={actions}
						tradeMode={workspace.tradeMode}
					/>
				</div>
				<Resizer
					className="resizer-vertical"
					onResize={e => {
						const update = actions.updateWorkspaceField.bind(null, 'rightPanelSize');
						updateSizeWithBoundary(window.innerWidth - e.x - 48, update);
					}}
				/>
				{workspace.rightPanelVisible &&
					<WorkspaceRightPanel actions={actions} workspace={workspace} />}
				<TabList
					id="right-tab-list"
					vertical
					showText={false}
					onChange={idx => onChangeRightPanel(idx)}
				>
					<Tab imgSrc="img/portfolio.svg" text="Open Positions" />
					<Tab imgSrc="img/statement.svg" text="Statement" />
					<Tab imgSrc="img/time.svg" text="Trading Times" />
					<Tab imgSrc="img/resources.svg" text="Asset Index" />
					<Tab imgSrc="img/video.svg" text="Video" />
					<Tab imgSrc="img/news.svg" text="News" />
				</TabList>
			</div>
		);
	}
}
