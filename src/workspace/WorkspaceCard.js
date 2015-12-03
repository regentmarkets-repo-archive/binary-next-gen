import React from 'react';
import { Tabs } from '../_common';
import { DesktopHeader, DesktopSidebar, Footer } from '../navigation';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import ProfitTableContainer from '../profit-table/ProfitTableContainer';
import StatementContainer from '../statement/StatementContainer';
import AssetSelectorContainer from '../asset-selector/AssetSelectorContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';
import TickTradePanel from '../tick-trade/TickTradePanel';
import WatchlistPanel from '../watchlist/WatchlistPanel';
import {defineMessages} from 'react-intl';

export default class WorkspaceCard extends React.Component {

	constructor(props) {
		super(props);
		this.tabTitles = defineMessages({
			assets: {
				id: 'Assets',
				defaultMessage: 'Assets',
			},
			details: {
				id: 'Details',
				defaultMessage: 'Details',
			},
			open_positions: {
				id: 'Open Positions',
				defaultMessage: 'Open Positions',
			},
			transactions: {
				id: 'Transactions',
				defaultMessage: 'Transactions',
			},
			profits: {
				id: 'Profits',
				defaultMessage: 'Profits',
			},
			trading_times: {
				id: 'Trading Times',
				defaultMessage: 'Trading Times',
			},
			assets_index: {
				id: 'Assets Index',
				defaultMessage: 'Assets Index',
			},
			videos: {
				id: 'Videos',
				defaultMessage: 'Videos',
			},
			news: {
				id: 'News',
				defaultMessage: 'News',
			},
		});
	}

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
	};

	render() {
		const {actions, workspace} = this.props;
		console.log(workspace);
		return	(
			<div id="screen">
				<DesktopHeader />
				{false && <DesktopSidebar />}
				<div id="panels">
					<div id="left-panel" style={{width: workspace.get('leftPanelSize')}}>
						<Tabs
							id="left-panel"
							activeIndex={workspace.get('leftActiveTab')}
							onChange={idx => actions.changeActiveTab('left', idx)}
							tabs={[
								{text: this.tabTitles.assets, component: <AssetSelectorContainer />},
								{text: this.tabTitles.details, component: <AssetDetailsContainer />},
							]} />
					</div>
					<div id="mid-panel">
						<div id="workarea">
							<TickTradePanel position={{left: 400, top: 52, width: 400, height: 545 }} />
							<WatchlistPanel position={{left: 575, top: 352, width: 550, height: 200 }} />
						</div>
						<div id="bottom-panel" style={{height: workspace.get('bottomPanelSize')}}>
							<Tabs
								id="bottom-panel"
								activeIndex={workspace.get('bottomActiveTab')}
								onChange={idx => actions.changeActiveTab('bottom', idx)}
								tabs={[
									{text: this.tabTitles.open_positions, component: <PortfolioContainer />},
									{text: this.tabTitles.transactions, component: <StatementContainer />},
									{text: this.tabTitles.profits, component: <ProfitTableContainer />},
								]} />
						</div>
					</div>
					<div id="right-panel" style={{width: workspace.get('rightPanelSize')}}>
						<Tabs
							id="right-panel"
							activeIndex={workspace.get('rightActiveTab')}
							onChange={idx => actions.changeActiveTab('right', idx)}
							tabs={[
								{text: this.tabTitles.trading_times, component: <TradingTimesContainer />},
								{text: this.tabTitles.assets_index, component: <AssetIndexContainer />},
								{text: this.tabTitles.videos, component: <VideoListContainer />},
								{text: this.tabTitles.news, component: <NewsContainer />},
							]} />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
