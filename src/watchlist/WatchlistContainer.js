import React, { Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import WatchlistCard from './WatchlistCard';
import watchlistSelectors from './watchlistSelectors';

@connect(watchlistSelectors)
export default class WatchlistContainer extends Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<WatchlistCard {...this.props} />
		);
	}
}
