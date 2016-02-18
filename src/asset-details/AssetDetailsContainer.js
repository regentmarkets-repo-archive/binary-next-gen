import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import AssetDetailsCard from './AssetDetailsCard';
import assetDetailsSelectors from './assetDetailsSelectors';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';

@connect(assetDetailsSelectors)
export default class AssetDetailsContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetDetailsCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
