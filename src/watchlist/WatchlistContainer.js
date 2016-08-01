import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import WatchlistCard from './WatchlistCard';
import watchlistSelectors from './watchlistSelectors';

@connect(watchlistSelectors)
export default class WatchlistContainer extends PureComponent {

	render() {
		return (
			<WatchlistCard {...this.props} />
		);
	}
}
