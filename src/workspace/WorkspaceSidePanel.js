import React, { PropTypes, PureComponent } from 'react';
import WatchlistContainer from '../watchlist/WatchlistContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import NewsContainer from '../news/NewsContainer';
import VideoListContainer from '../video/VideoListContainer';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';
import AssetInfoCard from '../asset-info/AssetInfoCard';
import SettingsContainer from '../settings/SettingsContainer';

const components = [
	PortfolioContainer,
	StatementContainer,
	WatchlistContainer,
	VideoListContainer,
	NewsContainer,
	TradingTimesContainer,
	AssetIndexContainer,
	AssetInfoCard,
	SettingsContainer,
];

export default class WorkspaceSidePanel extends PureComponent {

	static propTypes = {
		sideActiveTab: PropTypes.number.isRequired,
		sidePanelSize: PropTypes.number.isRequired,
		sidePanelVisible: PropTypes.bool.isRequired,
	};

	render() {
		const { sideActiveTab, sidePanelSize, sidePanelVisible } = this.props;

		const ActiveComponent = components[sideActiveTab];

		if (!sidePanelVisible) return null;

		return (
			<div
				className="workspace-panel"
				style={{ width: sidePanelSize }}
			>
				<ActiveComponent key={sideActiveTab} />
			</div>
		);
	}
}
