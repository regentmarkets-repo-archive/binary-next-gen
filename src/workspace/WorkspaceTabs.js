import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';
import { actions } from '../_store';

export default class WorkspaceTabs extends PureComponent {

	props: {
		activeTab: number,
		upgradeInfo: object,
	};

	onTabChange = (idx: number) => {
		actions.changeActiveWorkspaceTab('side', idx);
	}

	render() {
		const { activeTab, upgradeInfo } = this.props;

		return (
			<TabList
				id="right-tab-list"
				className="inverse"
				vertical
				activeIndex={activeTab}
				showText
				onChange={this.onTabChange}
			>
				<Tab imgSrc="img/portfolio.svg" text="Portfolio" />
				<Tab imgSrc="img/statement.svg" text="Statement" />
				<Tab imgSrc="img/watchlist.svg" text="Watchlist" />
				<Tab imgSrc="img/time.svg" text="Trading Times" />
				<Tab imgSrc="img/resources.svg" text="Asset Index" />
				<Tab imgSrc="img/info.svg" text="Details" />
				<Tab imgSrc="img/settings.svg" text="Settings" />
				<Tab
					imgSrc="img/info.svg"
					text={upgradeInfo && upgradeInfo.canUpgrade && !upgradeInfo.multi ? 'create-new-account' : 'accounts list'}
				/>
			</TabList>
		);
	}
}
