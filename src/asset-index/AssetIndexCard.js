import React, { PropTypes, Component } from 'react';
import MarketSubmarketPickerContainer from '../asset-picker/MarketSubmarketPickerContainer';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assetIndexRows: PropTypes.array.isRequired,
		submarket: PropTypes.string.isRequired,
	};

	render() {
		const { actions, assetIndexRows, submarket } = this.props;
		const headers = assetIndexRows.shift() || [];

		return (
			<div className="asset-index-card">
				<MarketSubmarketPickerContainer
					onChange={x => actions.updateAssetIndexFilter(x)}
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
