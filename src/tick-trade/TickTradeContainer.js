import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TickTradeCard from './TickTradeCard';

@connect(state => ({ tickTrade: state.tickTrade, workspace: state.workspace, assets: state.assets }))
export default class TickTradeContainer extends React.Component {

	static propTypes = {
		dispatch: PropTypes.func,
		tickTrade: PropTypes.object.isRequired,
		assets: PropTypes.object.isRequired,
		workspace: PropTypes.object.isRequired,
    };

	render() {
		return (
			<TickTradeCard {...this.props} />
		);
	}
}
