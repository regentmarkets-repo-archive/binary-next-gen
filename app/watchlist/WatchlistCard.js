import React from 'react';
import { connect } from 'react-redux';
import WatchlistTable from './WatchlistTable';

@connect(state => ({ ticks: state.ticks, assets: state.assets }))
export default class WatchlistCard extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		compact: React.PropTypes.bool.isRequired,
		ticks: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
	   	return nextProps.ticks !== this.props.ticks ||
			nextProps.compact !== this.props.compact ||
			nextProps.assets !== this.props.assets;
	}

	render() {
		return (
			<WatchlistTable {...this.props} />
		);
	}
}
