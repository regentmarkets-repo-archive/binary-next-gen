import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import AssetPickerCard from './AssetPickerCard';
import AssetPickerSelectors from '../_selectors/AssetPickerSelectors';

@connect(AssetPickerSelectors)
export default class AssetPickerContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<AssetPickerCard {...immutableChildrenToJS(this.props)} />
		);
	}
}
