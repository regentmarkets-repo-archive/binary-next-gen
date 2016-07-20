import React, { Component } from 'react';
import { connect } from 'react-redux';
import AssetDetailsCard from './AssetDetailsCard';
import assetDetailsSelectors from './assetDetailsSelectors';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';


@connect(assetDetailsSelectors)
export default class AssetDetailsContainer extends Component {

	render() {
		return (
			<AssetDetailsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
