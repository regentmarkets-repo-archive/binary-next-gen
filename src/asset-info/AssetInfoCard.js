import React, { PropTypes, PureComponent } from 'react';
import { Tab, TabList, OpenCloseNotice, DownArrow } from 'binary-components';
import DropDown from '../containers/DropDown';
import AssetPickerContainer from '../asset-picker/AssetPickerContainer';
import AssetDetailsContainer from '../asset-details/AssetDetailsContainer';
import DailyPricesContainer from '../daily-prices/DailyPricesContainer';
import DigitStatsContainer from '../digit-stats/DigitStatsContainer';

const components = [
	AssetDetailsContainer,
	DailyPricesContainer,
	DigitStatsContainer,
];

export default class AssetInfoCard extends PureComponent {

	static propTypes = {
		activeAsset: PropTypes.object.isRequired,
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
		const { activeTab, dropdownShown } = this.state;
		const activeAsset = { name: 'Palladium/USD', symbol: 'R_100' };
		const ActiveComponent = components[activeTab];

		return (
			<div className="asset-info-card">
				<h4 onMouseDown={this.openPicker}>
					{activeAsset.name}&nbsp;
					<DownArrow />
					<OpenCloseNotice isOpen={activeAsset.isOpen} />
				</h4>
				<DropDown
					shown={dropdownShown}
					title="Assets"
					onClose={this.onClose}
				>
					<AssetPickerContainer
						index={0}
						selectedAsset={activeAsset}
					/>
				</DropDown>
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
