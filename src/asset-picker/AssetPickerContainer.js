import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import AssetPickerCard from './AssetPickerCard';
import { assetPickerSelectors } from '../_selectors/AssetPickerSelectors';

@connect(assetPickerSelectors)
export default class AssetPickerContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetPickerCard {...this.props} />
		);
	}
}
