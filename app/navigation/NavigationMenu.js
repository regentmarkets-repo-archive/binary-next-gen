import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import BalanceDisplay from './BalanceDisplay';
import LanguagePicker from '../common/LanguagePicker';

@connect(state => ({ account: state.account }))
export default class NavigationMenu extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();
		return (
			<div>
			    <label>{account.loginid} (switcher)</label>
				<BalanceDisplay account={account} />
				<Link to={`/tick-trade`} activeClassName="active">Trade</Link>
				<Link to={`/portfolio`} activeClassName="active">Open Positions</Link>
				<Link to={`/statement`} activeClassName="active">Statement</Link>
				<LanguagePicker />
				<button>????</button>
				<button>Sign Out</button>
			</div>
		);
	}
}
