import React, { PropTypes, Component } from 'react';
import Resizer from '../_common/Resizer';
import TradesContainer from '../trades/TradesContainer';
import WorkspaceLeftPanel from './WorkspaceLeftPanel';
import WorkspaceRightPanel from './WorkspaceRightPanel';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';

export default class WorkspaceCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		return (
			<div id="panels">
				<TabList
					id="left-tab-list"
					vertical
					activeIndex={workspace.leftActiveTab}
					showText={false}
					onChange={idx => actions.changeActiveWorkspaceTab('left', idx)}
				>
					<Tab imgSrc="img/trade.svg" text="Assets" />
					<Tab imgSrc="img/watchlist.svg" text="Watchlist" />
				</TabList>
				{workspace.leftPanelVisible &&
					<WorkspaceLeftPanel actions={actions} workspace={workspace} />}
				<Resizer
					className="resizer-vertical"
					onResize={e => actions.changeWorkspacePanelSize('left', e.x - 45)}
				/>
				<div id="workarea">
					<TradesContainer
						actions={actions}
						tradeMode={workspace.tradeMode}
					/>
				</div>
				<Resizer
					className="resizer-vertical"
					onResize={e => actions.changeWorkspacePanelSize('right', window.innerWidth - e.x - 48)}
				/>
				{workspace.rightPanelVisible &&
					<WorkspaceRightPanel actions={actions} workspace={workspace} />}
				<TabList
					id="right-tab-list"
					vertical
					activeIndex={workspace.rightActiveTab}
					showText={false}
					onChange={idx => actions.changeActiveWorkspaceTab('right', idx)}
				>
					<Tab imgSrc="img/portfolio.svg" text="Open Positions" />
					<Tab imgSrc="img/statement.svg" text="Statement" />
					<Tab imgSrc="img/time.svg" text="Trading Times" />
					<Tab imgSrc="img/resources.svg" text="Asset Index" />
					<Tab imgSrc="img/video.svg" text="Video" />
					<Tab imgSrc="img/news.svg" text="News" />
					<Tab imgSrc="img/info.svg" text="Daily Prices" />
					<Tab imgSrc="img/info.svg" text="Details" />
				</TabList>
			</div>
		);
	}
}
