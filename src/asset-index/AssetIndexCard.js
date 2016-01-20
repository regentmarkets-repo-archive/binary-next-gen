import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { MarketPicker } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		submarketId: PropTypes.string.isRequired,
		submarketId: PropTypes.string.isRequired,
	};

	render() {
		const { actions, assets, submarketId, submarketName } = this.props;

		return (
			<div>
				<MarketPicker
					onChange={x => actions.updateAssetIndexSubmarket(x)}
					showAllOption={false}
					value={submarket}
				/>
				<AssetIndexTable
					key={submarket}
					submarket={submarketName}
					index={index.filter(a => submarketForAsset(a[0]) === submarket)}
				/>
			</div>
		);
	}
}
