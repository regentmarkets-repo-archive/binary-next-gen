import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import AssetIndexCard from './AssetIndexCard';
import assetIndexSelectors from './assetIndexSelectors';

@connect(assetIndexSelectors)
export default class AssetIndexContainer extends Component {

	render() {
		return (
			<AssetIndexCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
