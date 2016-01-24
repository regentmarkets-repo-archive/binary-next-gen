import React, { PropTypes } from 'react';
import { MarketPicker } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.array.isRequired,
		assetIndex: PropTypes.array.isRequired,
		indexTradeTypes: PropTypes.array.isRequired,
		submarket: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assetIndex, indexTradeTypes, submarket } = this.props;

		return (
			<div>
				<MarketPicker
					onChange={x => actions.updateAssetIndexSubmarket(x)}
					showAllOption={false}
					value={submarket}
				/>
				<AssetIndexTable
					submarketName={submarket.name}
					index={assetIndex}
					indexTradeTypes={indexTradeTypes}
				/>
			</div>
		);
	}
}
