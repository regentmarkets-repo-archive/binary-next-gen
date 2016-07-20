import React, { PropTypes, Component } from 'react';
import { actions } from '../_store';
import MarketSubmarketPickerContainer from '../asset-picker/MarketSubmarketPickerContainer';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends Component {

	static propTypes = {
		assetIndexRows: PropTypes.array.isRequired,
		submarket: PropTypes.string.isRequired,
	};

	onChangeMarketSubmarket = x =>
		actions.updateAssetIndexFilter(x);

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
