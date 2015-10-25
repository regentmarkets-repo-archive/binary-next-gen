import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TradeTypeSelectorCard from './TradeTypeSelectorCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class TradeTypeSelectorContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func,
	};

	render() {
		return (
			<TradeTypeSelectorCard actions={bindActionCreators(Actions, this.props.dispatch)} {...this.props} />
		);
	}
}
