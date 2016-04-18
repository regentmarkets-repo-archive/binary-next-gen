import React, { PropTypes, Component } from 'react';
import Resizer from '../_common/Resizer';
import TradesContainer from '../trades/TradesContainer';
import WorkspaceRightPanel from './WorkspaceRightPanel';
import Tab from '../_common/Tab';
import TabList from '../_common/TabList';
import ContractDetailsModal from './ContractDetailsModal';

export default class WorkspaceCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
	};

	render() {
		const { actions, workspace } = this.props;

		return (
			<div id="panels">
				<ContractDetailsModal actions={actions} />
				<TradesContainer
					actions={actions}
					tradeMode={workspace.tradeMode}
				/>
				<Resizer
					className="resizer-vertical"
					onResize={e => actions.changeWorkspacePanelSize('right', window.innerWidth - e.clientX - 48)}
				/>
				{workspace.rightPanelVisible &&
					<WorkspaceRightPanel actions={actions} workspace={workspace} />}
				<TabList
					id="right-tab-list"
					className="inverse"
					vertical
					activeIndex={workspace.rightActiveTab}
					showText
					onChange={idx => actions.changeActiveWorkspaceTab('right', idx)}
				>
					<Tab imgSrc="img/watchlist.svg" text="Watchlist" />
					<Tab imgSrc="img/portfolio.svg" text="Portfolio" />
					<Tab imgSrc="img/statement.svg" text="Statement" />
					<Tab imgSrc="img/time.svg" text="Trading Times" />
					<Tab imgSrc="img/resources.svg" text="Asset Index" />
					<Tab imgSrc="img/video.svg" text="Video" />
					<Tab imgSrc="img/news.svg" text="News" />
					<Tab imgSrc="img/ohlc.svg" text="Daily Prices" />
					<Tab imgSrc="img/info.svg" text="Details" />
				</TabList>
			</div>
		);
	}
}
