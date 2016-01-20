import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import WatchlistTable from './WatchlistTable';
import WatchlistSelectors from '../_selectors/WatchlistSelectors';

@connect(WatchlistSelectors)
export default class WatchlistContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<WatchlistTable {...this.props} />
		);
	}
}
