import React from 'react';
import { connect } from 'react-redux';
import TicksTable from './TicksTable';

@connect(state => ({ ticks: state.ticks }))
export default class TicksCard extends React.Component {

	static propTypes = {
		ticks: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<TicksTable ticks={this.props.ticks} />
			</div>
		);
	}
}
