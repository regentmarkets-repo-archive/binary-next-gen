import React from 'react';
import { connect } from 'react-redux';
import WatchlistTable from './WatchlistTable';

@connect(state => ({ ticks: state.ticks, assets: state.assets, favorites: state.workspace.get('favoriteAssets') }))
export default class WatchlistCard extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		compact: React.PropTypes.bool,
		ticks: React.PropTypes.object.isRequired,
		favorites: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
		return nextProps.ticks !== this.props.ticks ||
			nextProps.compact !== this.props.compact ||
			nextProps.assets !== this.props.assets ||
			nextProps.favorites !== this.props.favorites;
	}

	render() {
		return (
			<WatchlistTable {...this.props} />
		);
	}
}
