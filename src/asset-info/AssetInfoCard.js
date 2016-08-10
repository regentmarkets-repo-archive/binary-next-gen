import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import { Tab, TabList } from 'binary-components';
import AssetInfoSelector from './AssetInfoSelector';
import AssetInfoFilter from './AssetInfoFilter';
import AssetDetailsCard from '../asset-details/AssetDetailsCard';
import DailyPricesCard from '../daily-prices/DailyPricesCard';
import DigitStatsCard from '../digit-stats/DigitStatsCard';

const withDigits = [
	AssetDetailsCard,
	DigitStatsCard,
	DailyPricesCard,
];

const withoutDigits = [
	AssetDetailsCard,
	DailyPricesCard,
];

@connect(AssetInfoSelector)
export default class AssetInfoCard extends PureComponent {
	static propTypes = {
		details: PropTypes.object.isRequired,
		digitStats: PropTypes.object,
		dailyPrices: PropTypes.object.isRequired,
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
		const ActiveComponent = digitStats ? withDigits[activeTab] : withoutDigits[activeTab];

		let activeInstance;
		switch (activeTab) {
			case 0:
				activeInstance = <ActiveComponent {...immutableChildrenToJS(details)} />;
				break;
			case 1:
				activeInstance = <ActiveComponent {...immutableChildrenToJS(digitStats)} />;
				break;
			case 2:
				activeInstance = <ActiveComponent {...immutableChildrenToJS(dailyPrices)} />;
				break;
			default:
		}

		return (
			<div className="asset-info-card">
				<AssetInfoFilter />
				<TabList
					activeIndex={activeTab}
					onChange={this.onTabChange}
				>
					<Tab text="Details" />
					{digitStats && <Tab text="Digit Stats" />}
					<Tab text="Daily Prices" />
				</TabList>
				{activeInstance}
			</div>
		);
	}
}
