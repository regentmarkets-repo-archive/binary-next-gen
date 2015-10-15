import React from 'react';
import { connect } from 'react-redux';
import AssetSelectorCard from './AssetSelectorCard';

@connect(state => ({ assets: state.assets, workspace: state.workspace }))
export default class AssetSelectorContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object,
		workspace: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<AssetSelectorCard {...this.props} />
		);
	}
}
