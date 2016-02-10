import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
// import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import marketTreeSelector from '../_selectors/marketTreeSelector';
import MarketPicker from './MarketPicker';

@connect(marketTreeSelector)
export default class MarketPickerContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<MarketPicker {...this.props} />
		);
	}
}
