import React, { Component } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import AssetIndexCard from './AssetIndexCard';
import assetIndexSelectors from './assetIndexSelectors';

@connect(assetIndexSelectors)
export default class AssetIndexContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetIndexCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
