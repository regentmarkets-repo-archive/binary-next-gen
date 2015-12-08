import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';
import WatchlistTable from './WatchlistTable';

@connect(state => ({ ticks: state.ticks, assets: state.assets, favorites: state.watchlist }))
export default class WatchlistContainer extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		compact: React.PropTypes.bool,
		ticks: React.PropTypes.object.isRequired,
		favorites: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<WatchlistTable {...this.props} />
		);
	}
}
