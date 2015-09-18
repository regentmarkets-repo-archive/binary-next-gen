import React from 'react';
import { connect } from 'react-redux';
import TickTable from './TickTable';

@connect(state => ({ ticks: state.serverData.ticks }))
export default class TicksPage extends React.Component {

	static propTypes = {
		ticks: React.PropTypes.array.isRequired,
	};

	render() {
		return (
			<div>
				<TickTable ticks={this.props.ticks} />
			</div>
		);
	}
}
