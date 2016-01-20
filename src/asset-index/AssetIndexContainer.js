import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import AssetIndexCard from './AssetIndexCard';
import assetIndexSelector from '../_selectors/AssetIndexSelectors';

@connect(assetIndexSelector)
export default class AsssetIndexContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetIndexCard {...this.props} />
		);
	}
}
