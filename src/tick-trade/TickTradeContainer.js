import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TickTradeCard from './TickTradeCard';

@connect(state => ({ tickTrade: state.tickTrade, workspace: state.workspace, assets: state.assets }))
export default class TickTradeContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func,
		tickTrade: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		workspace: React.PropTypes.object.isRequired,
    };

	render() {
		return (
			<TickTradeCard
				actions={bindActionCreators(Actions, this.props.dispatch)}
				{...this.props}
			/>
		);
	}
}
