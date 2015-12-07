import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import AssetSelectorCard from './AssetSelectorCard';

@connect(state => ({ assets: state.assets, assetSelector: state.assetSelector, workspace: state.workspace }))
export default class AssetSelectorContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: React.PropTypes.object,
		assetSelector: React.PropTypes.object,
		workspace: React.PropTypes.object,
		dispatch: React.PropTypes.func,
		actions: React.PropTypes.object,
	};

	render() {
		return (
			<AssetSelectorCard {...this.props} />
		);
	}
}
