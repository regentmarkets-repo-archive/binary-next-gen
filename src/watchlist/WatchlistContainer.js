import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import WatchlistTable from './WatchlistTable';

@connect(state => ({ ticks: state.ticks, assets: state.assets, favorites: state.watchlist }))
export default class WatchlistContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: PropTypes.object.isRequired,
		compact: PropTypes.bool,
		ticks: PropTypes.object.isRequired,
		favorites: PropTypes.object.isRequired,
	};

	render() {
		return (
			<WatchlistTable {...this.props} />
		);
	}
}
