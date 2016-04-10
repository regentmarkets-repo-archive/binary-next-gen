import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import AssetPickerCard from './AssetPickerCard';
import assetPickerSelectors from './AssetPickerSelectors';

@connect(assetPickerSelectors)
export default class AssetPickerContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetPickerCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
