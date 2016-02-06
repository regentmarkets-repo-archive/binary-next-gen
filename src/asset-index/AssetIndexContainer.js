import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import AssetIndexCard from './AssetIndexCard';
import assetIndexSelectors from '../_selectors/AssetIndexSelectors';

@connect(assetIndexSelectors)
export default class AsssetIndexContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetIndexCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
