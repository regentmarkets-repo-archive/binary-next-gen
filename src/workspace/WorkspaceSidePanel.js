import React, { PropTypes, Component } from 'react';
import WatchlistContainer from '../watchlist/WatchlistContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';
import DailyPricesContainer from '../daily-prices/DailyPricesContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import DigitStatsContainer from '../digit-stats/DigitStatsContainer';
import SettingsContainer from '../settings/SettingsContainer';

const components = [
	PortfolioContainer,
	StatementContainer,
	WatchlistContainer,
	TradingTimesContainer,
	AssetIndexContainer,
	VideoListContainer,
	NewsContainer,
	DailyPricesContainer,
	AssetDetailsContainer,
	DigitStatsContainer,
	SettingsContainer,
];

export default class WorkspaceSidePanel extends Component {

	static propTypes = {
		sideActiveTab: PropTypes.number.isRequired,
		sidePanelSize: PropTypes.number.isRequired,
	};

	render() {
		const { sideActiveTab, sidePanelSize } = this.props;

		const ActiveComponent = components[sideActiveTab];

		return (
			<div
				className="workspace-panel"
				style={{ width: sidePanelSize }}
			>
				<ActiveComponent />
			</div>
		);
	}
}
