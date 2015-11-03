import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { NumberPlain, LanguagePicker } from '../_common';

@connect(state => ({ account: state.account }))
export default class NavigationMenu extends React.Component {

	static propTypes = {
		account: React.PropTypes.object.isRequired,
	};

	render() {
		const account = this.props.account.toJS();
		return (
			<nav className="sidebar">
				<div className="account-info">
					{account.loginid}<br/>
					{account.email}<br/>
					<NumberPlain currency={account.currency} value={account.balance} />
				</div>
				<Link to={`/tick-trade`} className="sidebar-btn" activeClassName="active"><img src="/img/trade.svg" />Trade</Link>
				<Link to={`/watchlist-mobile`} className="sidebar-btn" activeClassName="active"><img src="/img/watchlist.svg" />Watchlist</Link>
				<Link to={`/portfolio-mobile`} className="sidebar-btn" activeClassName="active"><img src="/img/portfolio.svg" />Open Positions</Link>
				<Link to={`/profit-table-mobile`} className="sidebar-btn" activeClassName="active"><img src="/img/profit.svg" />Profit Table</Link>
				<Link to={`/statement-mobile`} className="sidebar-btn" activeClassName="active"><img src="/img/statement.svg" />Statement</Link>
				<LanguagePicker />
				<Link to={`/settings-mobile`} className="sidebar-btn" activeClassName="active"><img src="/img/settings.svg" /> Settings</Link>
				<Link to={`/signout`} className="sidebar-btn" activeClassName="active"><img src="/img/signout.svg" /> Sign Out</Link>
			</nav>
		);
	}
}
