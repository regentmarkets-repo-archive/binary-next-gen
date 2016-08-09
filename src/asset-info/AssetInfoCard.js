import React, { PureComponent } from 'react';
import { Tab, TabList } from 'binary-components';
import AssetInfoFilter from './AssetInfoFilter';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import DailyPricesContainer from '../daily-prices/DailyPricesContainer';
import DigitStatsContainer from '../digit-stats/DigitStatsContainer';

const components = [
	AssetDetailsContainer,
	DigitStatsContainer,
	DailyPricesContainer,
];

export default class AssetInfoCard extends PureComponent {

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	openPicker = () =>
        this.setState({ dropdownShown: true });

	onTabChange = idx =>
		this.setState({ activeTab: idx });

	render() {
		const { activeTab } = this.state;
		const ActiveComponent = components[activeTab];

		return (
			<div className="asset-info-card">
				<AssetInfoFilter />
				<TabList
					activeIndex={activeTab}
					onChange={this.onTabChange}
				>
					<Tab text="Details" />
					<Tab text="Digit Stats" />
					<Tab text="Daily Prices" />
				</TabList>
				<ActiveComponent />
			</div>
		);
	}
}
