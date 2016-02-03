import React, { PropTypes } from 'react';
import { MarketPicker } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assetIndexRows: PropTypes.array.isRequired,
		submarket: PropTypes.string.isRequired,
	};

	render() {
		const { actions, assetIndexRows, submarket } = this.props;
		const headers = assetIndexRows.shift();

		return (
			<div>
				<MarketPicker
					onChange={x => actions.updateAssetIndexSubmarket(x)}
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
