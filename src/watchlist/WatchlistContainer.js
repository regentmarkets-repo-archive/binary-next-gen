import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import immutableChildrenToJS from 'binary-utils/lib/immutableChildrenToJS';

import WatchlistTable from './WatchlistTable';
import watchlistSelectors from './watchlistSelectors';

@connect(watchlistSelectors)
export default class WatchlistContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<WatchlistTable {...immutableChildrenToJS(this.props)} />
		);
	}
}
