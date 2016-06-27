import React, { PropTypes, Component } from 'react';
import MarketSubmarketPickerContainer from '../asset-picker/MarketSubmarketPickerContainer';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assetIndexRows: PropTypes.array.isRequired,
		submarket: PropTypes.string.isRequired,
	};

	onChangeMarketSubmarket = x =>
		this.props.actions.updateAssetIndexFilter(x);

	render() {
		const { assetIndexRows, submarket } = this.props;
		const headers = assetIndexRows.shift() || [];

		return (
			<div className="asset-index-card">
				<MarketSubmarketPickerContainer
					onChange={this.onChangeMarketSubmarket}
					allOptionShown={false}
					value={submarket}
				/>
				<AssetIndexTable
					headers={headers}
					durations={assetIndexRows}
				/>
			</div>
		);
	}
}
