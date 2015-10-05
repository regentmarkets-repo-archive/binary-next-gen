import React from 'react';
import { bindActionCreators } from 'redux';
import * as AssetActions from '../_actions/AssetActions';
import AssetList from './AssetList';
import AssetSearch from './AssetSearch';

const AssetSelectorPane = props => {
	window.console.log(props, props.assets);
	const { shownAssets } = props.assets.toJS(); // tree, active, shownAssets, query
	const actions = bindActionCreators(AssetActions, props.dispatch);

	return (
		<div>
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
