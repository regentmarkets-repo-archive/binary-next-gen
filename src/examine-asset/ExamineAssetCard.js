import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { Tab, TabList } from 'binary-components';
import examineAssetSelectors from './examineAssetSelectors';
import ExamineAssetFilter from './ExamineAssetFilter';
import AssetDetailsCard from '../asset-details/AssetDetailsCard';
import DailyPricesCard from '../daily-prices/DailyPricesCard';
import DigitStatsCard from '../digit-stats/DigitStatsCard';

@connect(examineAssetSelectors)
export default class ExamineAssetCard extends PureComponent {

	static propTypes = {
		details: PropTypes.object,
		digitStats: PropTypes.object,
		dailyPrices: PropTypes.object,
	};

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
		const { details, digitStats, dailyPrices } = this.props;

		return (
			<div className="examine-asset-card">
				<ExamineAssetFilter />
				<TabList
					activeIndex={activeTab}
					onChange={this.onTabChange}
				>
					<Tab text="Details" />
					<Tab text="Digit Stats" />
					<Tab text="Daily Prices" />
				</TabList>
				{activeTab === 0 && <AssetDetailsCard {...immutableChildrenToJS(details)} />}
				{activeTab === 1 && <DigitStatsCard {...immutableChildrenToJS(digitStats)} />}
				{activeTab === 2 && <DailyPricesCard {...immutableChildrenToJS(dailyPrices)} />}
			</div>
		);
	}
}
