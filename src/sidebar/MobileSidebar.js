import React, { PropTypes, Component } from 'react';
import BalanceContainer from '../balance/BalanceContainer';
import AccountMenuItem from './AccountMenuItem';
import SidebarBtn from './SidebarBtn';

export default class MobileSidebar extends Component {

	static propTypes = {
		email: PropTypes.string.isRequired,
		loginid: PropTypes.string.isRequired,
		accounts: PropTypes.arrayOf(PropTypes.shape({
			account: PropTypes.string.isRequired,
			token: PropTypes.string.isRequired,
		})),
	};

	render() {
		const { loginid, email, accounts } = this.props;

		return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
					<BalanceContainer />
				</div>
				{accounts
					.filter(x => x.account !== loginid)
					.map(x => <AccountMenuItem key={x.token} account={x.account} token={x.token} />)
				}
				<SidebarBtn to="/" img="img/trade.svg" text="Trade" />
				<SidebarBtn to="/watchlist" img="img/watchlist.svg" text="Watchlist" />
				<SidebarBtn to="/portfolio" img="img/portfolio.svg" text="Open Positions" />
				<SidebarBtn to="/statement" img="img/statement.svg" text="Statement" />
				<SidebarBtn to="/news" img="img/news.svg" text="News" />
				<SidebarBtn to="/resources" img="img/resources.svg" text="Resources" />
				<SidebarBtn to="/settings" img="img/settings.svg" text="Settings" />
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
