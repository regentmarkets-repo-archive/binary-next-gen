import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';
import marketTreeSelectors from '../_selectors/marketTreeSelectors';
import MarketSubmarketPicker from './MarketSubmarketPicker';

@connect(marketTreeSelectors)
export default class MarketSubmarketPickerContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<MarketSubmarketPicker {...immutableChildrenToJS(this.props)} />
		);
	}
}
