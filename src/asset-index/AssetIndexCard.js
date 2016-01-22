import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { MarketPicker } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
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
					value={submarket.id}
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
