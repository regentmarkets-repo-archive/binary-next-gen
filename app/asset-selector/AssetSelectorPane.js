import React from 'react';
import { bindActionCreators } from 'redux';
import * as AssetActions from '../_actions/AssetActions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';
import MarketSelector from './MarketSelector';

const AssetSelectorPane = props => {
	const { shownAssets, tree } = props.assets.toJS(); // tree, active, shownAssets, query
	const actions = bindActionCreators(AssetActions, props.dispatch);

	return (
		<div>
			<MarketSelector markets={Object.keys(tree)} selected={props.params.market}/>
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
