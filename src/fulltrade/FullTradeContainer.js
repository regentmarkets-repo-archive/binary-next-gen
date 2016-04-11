import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import FullTradeCard from './FullTradeCard';
import singleTradeSelectors from '../trades/singleTradeSelectors';

@connect(singleTradeSelectors)
export default class FullTradeContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<FullTradeCard
				index={0}
                {...immutableChildrenToJS(this.props)}
			/>
		);
	}
}
