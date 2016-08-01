import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AssetDetailsCard from './AssetDetailsCard';
import assetDetailsSelectors from './assetDetailsSelectors';
import { immutableChildrenToJS } from 'binary-utils';


@connect(assetDetailsSelectors)
export default class AssetDetailsContainer extends PureComponent {

	render() {
		return (
			<AssetDetailsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
