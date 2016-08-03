import React, { PropTypes, PureComponent } from 'react';
import { M } from 'binary-components';
import BalanceContainer from '../balance/BalanceContainer';
import AccountItemsList from './AccountItemsList';
import SidebarBtn from './SidebarBtn';
import { signOut } from '../_data/Auth';

export default class MobileSidebar extends PureComponent {

	static propTypes = {
		email: PropTypes.string.isRequired,
		loginid: PropTypes.string.isRequired,
		accounts: PropTypes.arrayOf(PropTypes.shape({
			account: PropTypes.string.isRequired,
			token: PropTypes.string.isRequired,
		})),
	};

	onSignOut(e) {
		e.stopPropagation();
		signOut();
	}

	render() {
		const { loginid, email, accounts } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
					<BalanceContainer />
				</div>
				<AccountItemsList loginid={loginid} accounts={accounts} />
				<SidebarBtn to="/" img="img/trade.svg" text="Trade" />
				<SidebarBtn to="/watchlist" img="img/watchlist.svg" text="Watchlist" />
				<SidebarBtn to="/portfolio" img="img/portfolio.svg" text="Portfolio" />
				<SidebarBtn to="/statement" img="img/statement.svg" text="Statement" />
				<SidebarBtn to="/news" img="img/news.svg" text="News" />
				<SidebarBtn to="/resources" img="img/resources.svg" text="Resources" />
				<SidebarBtn to="/settings" img="img/settings.svg" text="Settings" />
				<label htmlFor="Sign-Out" onClick={this.onSignOut} className="sidebar-btn">
					<img src="img/signout.svg" role="presentation" />
					<M m="Sign Out" />
				</label>
			</nav>
		);
	}
}
