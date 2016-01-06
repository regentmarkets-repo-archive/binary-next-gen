import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import AssetSelectorCard from './AssetSelectorCard';

@connect(state => ({
	assets: state.assets,
	assetSelector: state.assetSelector,
	workspace: state.workspace,
	watchlist: state.watchlist,
}))
export default class AssetSelectorContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: PropTypes.object,
		assetSelector: PropTypes.object,
		workspace: PropTypes.object,
		watchlist: PropTypes.object,
		dispatch: PropTypes.func,
		actions: PropTypes.object,
	};

	render() {
		return (
			<AssetSelectorCard {...this.props} />
		);
	}
}
