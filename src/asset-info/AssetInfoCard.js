import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { Tab, TabList } from 'binary-components';
import AssetInfoSelector from './AssetInfoSelector';
import AssetInfoFilter from './AssetInfoFilter';
import AssetDetailsCard from '../asset-details/AssetDetailsCard';
import DailyPricesCard from '../daily-prices/DailyPricesCard';
import DigitStatsCard from '../digit-stats/DigitStatsCard';

@connect(AssetInfoSelector)
export default class AssetInfoCard extends PureComponent {
	static propTypes = {
		details: PropTypes.object,
		digitStats: PropTypes.object,
		dailyPrices: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = { activeTab: 0 };
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.digitStats && this.state.activeTab === 1) {
			this.onTabChange(0);
		}
	}

	openPicker = () =>
        this.setState({ dropdownShown: true });

	onTabChange = idx =>
		this.setState({ activeTab: idx });

	render() {
		const { activeTab } = this.state;
		const { details, digitStats, dailyPrices } = this.props;

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
				{activeTab === 0 && <AssetDetailsCard {...immutableChildrenToJS(details)} />}
				{activeTab === 1 && <DigitStatsCard {...immutableChildrenToJS(digitStats)} />}
				{activeTab === 2 && <DailyPricesCard {...immutableChildrenToJS(dailyPrices)} />}
			</div>
		);
	}
}
