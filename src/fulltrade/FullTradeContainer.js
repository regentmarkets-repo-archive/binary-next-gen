import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import FullTradeCard from './FullTradeCard';
import tradesSelectors from '../trades/tradesSelectors';

@connect(tradesSelectors)
export default class AssetPickerContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: PropTypes.object.isRequired,
		trades: PropTypes.array.isRequired,
	};

	render() {
		return (
			<FullTradeCard
				index={0}
                {...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
