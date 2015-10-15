import React from 'react';
import { connect } from 'react-redux';
import TicksTable from './TicksTable';

@connect(state => ({ ticks: state.ticks, assets: state.assets }))
export default class TicksCard extends React.Component {

	static propTypes = {
		assets: React.PropTypes.object.isRequired,
		ticks: React.PropTypes.object.isRequired,
	};

	shouldComponentUpdate(nextProps) {
	   	return nextProps.ticks !== this.props.ticks ||
			nextProps.assets !== this.props.assets;
	}

	render() {
		return (
			<TicksTable ticks={this.props.ticks} assets={this.props.assets} />
		);
	}
}
