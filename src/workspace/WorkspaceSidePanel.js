import React, { PureComponent } from 'react';
import WatchlistContainer from '../watchlist/WatchlistContainer';
import TradingTimesContainer from '../trading-times/TradingTimesContainer';
import AssetIndexContainer from '../asset-index/AssetIndexContainer';
import PortfolioContainer from '../portfolio/PortfolioContainer';
import StatementContainer from '../statement/StatementContainer';
import ExamineAssetContainer from '../examine-asset/ExamineAssetContainer';
import SettingsContainer from '../settings/SettingsContainer';
import UserAccountsContainer from '../user-accounts/UserAccountsContainer';

const components = [
	PortfolioContainer,
	StatementContainer,
	WatchlistContainer,
	TradingTimesContainer,
	AssetIndexContainer,
	ExamineAssetContainer,
	SettingsContainer,
  UserAccountsContainer
];

export default class WorkspaceSidePanel extends PureComponent {

	props: {
		sideActiveTab: number,
		sidePanelSize: number,
		sidePanelVisible: boolean,
	};

	render() {
		const { sideActiveTab, sidePanelSize, sidePanelVisible } = this.props;

		const ActiveComponent = components[sideActiveTab] || components[0];

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
