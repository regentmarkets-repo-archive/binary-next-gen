import React from 'react';
import { connect } from 'react-redux';
import AssetDetailsCard from './AssetDetailsCard';

@connect(state => ({ assets: state.assets, workspace: state.workspace }))
export default class AssetDetailsContainer extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object,
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<AssetDetailsCard {...this.props} />
		);
	}
}
