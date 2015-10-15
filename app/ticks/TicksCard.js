import React from 'react';
import { connect } from 'react-redux';
import TicksTable from './TicksTable';

@connect(state => ({ ticks: state.ticks, assets: state.assets }))
export default class TicksCard extends React.Component {

	static propTypes = {
		ticks: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<TicksTable ticks={this.props.ticks} assets={this.props.assets} />
		);
	}
}
