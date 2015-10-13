import React from 'react';
import { connect } from 'react-redux';
import TickTable from './TickTable';

@connect(state => ({ ticks: state.ticks }))
export default class TicksCard extends React.Component {

	static propTypes = {
		ticks: React.PropTypes.object.isRequired,
	};

	render() {
		return (
			<div>
				<TickTable ticks={this.props.ticks} />
			</div>
		);
	}
}
