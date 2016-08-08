import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import AssetInfoCard from './AssetInfoCard';
// import assetDetailsSelectors from './assetDetailsSelectors';

// @connect(assetDetailsSelectors)
export default class AssetDetailsContainer extends PureComponent {

	render() {
		return (
			<AssetInfoCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
