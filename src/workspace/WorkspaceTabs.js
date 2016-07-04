import React, { PropTypes, Component } from 'react';
import Tab from 'binary-components/lib/Tab';
import TabList from 'binary-components/lib/TabList';
import { actions } from '../_store';

export default class WorkspaceCard extends Component {

	static propTypes = {
		activeTab: PropTypes.number.isRequired,
	};

	onTabChange = idx => {
		actions.changeActiveWorkspaceTab('side', idx);
	}

	render() {
		const { activeTab } = this.props;

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
				<Tab imgSrc="img/video.svg" text="Video" />
				<Tab imgSrc="img/news.svg" text="News" />
				<Tab imgSrc="img/ohlc.svg" text="Daily Prices" />
				<Tab imgSrc="img/info.svg" text="Details" />
				<Tab imgSrc="img/barchart.svg" text="Digit Stats" />
				<Tab imgSrc="img/settings.svg" text="Settings" />
			</TabList>
		);
	}
}
