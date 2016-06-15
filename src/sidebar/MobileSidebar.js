import React, { PropTypes, Component } from 'react';
import BalanceContainer from '../balance/BalanceContainer';
import SidebarBtn from './SidebarBtn';

const switchToAccount = token => {
	localStorage.setItem('account', JSON.stringify({ token }));
	window.location = '/';
};

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
				{accounts.filter(x => x.account !== loginid).map(x =>
					<a
						key={x.account}
						className="sidebar-btn"
						onClick={() => switchToAccount(x.token)}
					>
						<img src="img/icon.png" alt="" />
						<span>Switch to {x.account}</span>
					</a>
				)}				<SidebarBtn to="/" img="img/trade.svg" text="Trade" />
				{/* <SidebarBtn to="/watchlist-mobile" img="img/watchlist.svg" text="Watchlist" /> */}
				<SidebarBtn to="/portfolio-mobile" img="img/portfolio.svg" text="Open Positions" />
				<SidebarBtn to="/statement-mobile" img="img/statement.svg" text="Statement" />
				<SidebarBtn to="/news-mobile" img="img/news.svg" text="News" />
				<SidebarBtn to="/resources-mobile" img="img/resources.svg" text="Resources" />
				<SidebarBtn to="/settings-mobile" img="img/settings.svg" text="Settings" />
				<SidebarBtn to="/signout" img="img/signout.svg" text="Sign Out" />
			</nav>
		);
	}
}
