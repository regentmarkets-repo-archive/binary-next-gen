import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import AssetDetailsCard from './AssetDetailsCard';

@connect(state => ({ assets: state.assets, workspace: state.workspace }))
export default class AssetDetailsContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetDetailsCard {...this.props} />
		);
	}
}
