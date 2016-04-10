import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import marketTreeSelector from '../_selectors/marketTreeSelector';
import MarketPicker from './MarketPicker';

@connect(marketTreeSelector)
export default class MarketPickerContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<MarketPicker {...immutableChildrenToJS(this.props)} />
		);
	}
}
