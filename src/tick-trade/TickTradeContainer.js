import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TickTradeCard from './TickTradeCard';

@connect(state => ({ tickTrade: state.tickTrade, workspace: state.workspace, assets: state.assets }))
export default class TickTradeContainer extends React.Component {

	static propTypes = {
		children: React.PropTypes.any,
		trickTrade: React.PropTypes.object,
		assets: React.PropTypes.object,
		dispatch: React.PropTypes.func,
		workspace: React.PropTypes.object,
    };

	render() {
		return (
			<TickTradeCard
				actions={bindActionCreators(Actions, this.props.dispatch)}
				{...this.props} />
		);
	}
}
