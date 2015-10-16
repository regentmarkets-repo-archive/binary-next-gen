import React from 'react';
import { MarketSelector } from '../common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		assetIndexWorkspace: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.assets !== this.props.assets ||
			nextProps.assetIndexWorkspace !== this.props.assetIndexWorkspace;
	}

	render() {
		const {assets, assetIndexWorkspace} = this.props;
		const {index, list} = assets.toJS();
		const submarket = assetIndexWorkspace.get('submarket');
		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket_display_name;

		return (
			<div>
				<MarketSelector
					onChange={x => this.changeSubmarket(x)}
					showAllOption={false} />
				<AssetIndexTable
					key={submarket}
					submarket={submarket}
					index={index.filter(a => submarketForAsset(a.symbol) === submarket)} />
			</div>
		);
	}
}
