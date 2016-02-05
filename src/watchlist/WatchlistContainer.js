import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import { immutableChildrenToJS } from '../_utils/ObjectUtils';
import WatchlistTable from './WatchlistTable';
import WatchlistSelectors from '../_selectors/WatchlistSelectors';

@connect(WatchlistSelectors)
export default class WatchlistContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<WatchlistTable {...immutableChildrenToJS(this.props)} />
		);
	}
}
