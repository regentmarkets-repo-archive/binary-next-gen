import React from 'react';
import { connect } from 'react-redux';
import BalancePane from './BalancePane';

@connect(state => ({ balances: state.account.balances }))
export default class BalanceContainer extends React.Component {

	static propTypes = {
		balance: React.PropTypes.object,
	};

	render() {
		return (
			<BalancesPane {...this.props} />
		);
	}
}
