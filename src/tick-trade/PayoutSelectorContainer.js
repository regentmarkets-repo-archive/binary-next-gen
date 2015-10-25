import React from 'react';
import * as Actions from '../_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PayoutSelectorCard from './PayoutSelectorCard';

@connect(state => ({ tickTrade: state.tickTrade }))
export default class PayoutSelectorContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func,
		tickTrade: React.PropTypes.object,
		onChange: React.PropTypes.func,
	};

	render() {
		return (
			<PayoutSelectorCard actions={bindActionCreators(Actions, this.props.dispatch)} {...this.props} />
		);
	}
}
