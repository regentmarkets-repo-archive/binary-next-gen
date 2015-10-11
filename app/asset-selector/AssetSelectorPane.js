import React from 'react';
import { bindActionCreators } from 'redux';
import * as AssetActions from '../_actions/AssetActions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';
import { MarketSelector } from '../common';

const AssetSelectorPane = ({assets, params, dispatch}) => {
	const { shownAssets, tree } = assets.toJS(); // tree, active, shownAssets, query
	const actions = bindActionCreators(AssetActions, dispatch);

	return (
		<div>
			<MarketSelector markets={Object.keys(tree)} selected={params.market} prefixRoute="/asset-selector/" />
			<AssetSearch actions={actions} />
			<AssetList assets={shownAssets} />
		</div>
	);
};

AssetSelectorPane.propTypes = {
    assets: React.PropTypes.object,
	dispatch: React.PropTypes.func,
};

export default AssetSelectorPane;
