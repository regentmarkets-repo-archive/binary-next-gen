import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { MarketSelector } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		assetIndexFilter: PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, assetIndexFilter } = this.props;
		const { index, list, tree } = assets.toJS();
		const submarket = assetIndexFilter.get('submarket');
		const submarketName = Object.keys(tree).map(market => {
			const subs = tree[market].submarkets;
			if (Object.keys(subs).indexOf(submarket) > -1) return subs[submarket].display_name;
		})[0];
		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket;

		return (
			<div>
				<MarketSelector
					onChange={x => actions.updateAssetIndexSubmarket(x)}
					showAllOption={false} />
				<AssetIndexTable
					key={submarket}
					submarket={submarketName}
					index={index.filter(a => submarketForAsset(a[0]) === submarket)} />
			</div>
		);
	}
}
