import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { NumberPlain, LanguagePicker } from '../common';

@connect(state => ({ account: state.account }))
export default class NavigationMenu extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();
		return (
			<nav className="sidebar">
				<div>
					{account.loginid}<br/>
					{account.email}<br/>
					<NumberPlain currency={account.currency} value={account.balance} />
				</div>
				<Link to={`/tick-trade`} className="sidebar-btn" activeClassName="active">Trade</Link>
				<Link to={`/portfolio-mobile`} className="sidebar-btn" activeClassName="active">Open Positions</Link>
				<Link to={`/profit-table-mobile`} className="sidebar-btn" activeClassName="active">Profit Table</Link>
				<Link to={`/statement-mobile`} className="sidebar-btn" activeClassName="active">Statement</Link>
				<LanguagePicker />
				<Link to={`/settings-mobile`} className="sidebar-btn" activeClassName="active">Settings</Link>
				<Link to={`/`} className="sidebar-btn" activeClassName="active">Sign Out</Link>
			</nav>
		);
	}
}
