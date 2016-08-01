import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from 'binary-utils';
import marketTreeSelectors from '../_selectors/marketTreeSelectors';
import MarketSubmarketPicker from './MarketSubmarketPicker';

@connect(marketTreeSelectors)
export default class MarketSubmarketPickerContainer extends PureComponent {

	render() {
		return (
			<MarketSubmarketPicker {...immutableChildrenToJS(this.props)} />
		);
	}
}
