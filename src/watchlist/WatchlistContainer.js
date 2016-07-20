import React, { Component } from 'react';
import { connect } from 'react-redux';
import WatchlistCard from './WatchlistCard';
import watchlistSelectors from './watchlistSelectors';

@connect(watchlistSelectors)
export default class WatchlistContainer extends Component {

	render() {
		return (
			<WatchlistCard {...this.props} />
		);
	}
}
